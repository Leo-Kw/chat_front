import { useEffect, useCallback, useState, useRef } from 'react'
import { useGlobalState, useIntlLocale, useSocket } from '@/hook'
import { scrollToBottom } from '@/utils'
import { AuthService } from '@/shared/services'
import { Popup, Icon, Button, Modal } from '@/common/components'
import { Emoji } from './components'
import { ChatRecord } from './components/chat-record'

// const pickerOpts = {
//   types: [
//     {
//       description: 'code',
//       accept: {
//         '*/*': [],
//       },
//     },
//   ],
//   excludeAcceptAllOption: true,
//   multiple: false,
// }

const colors = [
  'aqua',
  'azure',
  'beige',
  'bisque',
  'black',
  'blue',
  'brown',
  'chocolate',
  'coral' /* … */,
]

const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(' | ')};`

export const ChatSend = () => {
  const socket = useSocket()
  const t = useIntlLocale()
  const { state } = useGlobalState()
  const [messageContent, setMessageContent] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const [isInput, setIsInput] = useState(false)
  const [showRecord, setShowRecord] = useState(false)
  const { userInfo } = state

  const sendMessage = useCallback(() => {
    if (userInfo.name === '') {
      window.location.href = '/login'
      AuthService.removeToken()
    } else {
      socket.emit(
        'sendMessage',
        {
          userId: userInfo.id,
          messageContent,
          messageType: 'text',
        },
        (res: boolean) => {
          res && scrollToBottom()
        }
      )
      setMessageContent('')
    }
  }, [socket, userInfo, messageContent])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        !isInput && messageContent && sendMessage()
        return
      }
    },
    [sendMessage, isInput, messageContent]
  )

  const inputStart = () => {
    setIsInput(true)
  }

  const inputEnd = () => {
    setIsInput(false)
  }

  useEffect(() => {
    const containerRef = textAreaRef
    if (containerRef && containerRef.current) {
      containerRef.current.addEventListener('keydown', handleKeyDown)
      containerRef.current.addEventListener('compositionstart', inputStart, false)
      containerRef.current.addEventListener('compositionend', inputEnd, false)
    }
    return () => {
      if (containerRef && containerRef.current) {
        containerRef.current.removeEventListener('keydown', handleKeyDown)
        containerRef.current.removeEventListener('compositionstart', inputStart)
        containerRef.current.removeEventListener('compositionend', inputEnd)
      }
    }
  }, [handleKeyDown])

  // const getFile = async () => {
  //   try {
  //     const [fileHandle] = await showOpenFilePicker(pickerOpts)
  //     const file = await fileHandle.getFile()
  //     console.log(file)
  //   } catch (e) {
  //     // Handling of user rejection
  //   }
  // }

  const handleSpeedRecognition = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        console.log('已获得麦克风权限')

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
        // const SpeechRecognitionEvent =
        //   window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

        // 检查浏览器支持情况
        if (SpeechRecognition) {
          const recognition = new SpeechRecognition()
          const speechRecognitionList = new SpeechGrammarList()

          speechRecognitionList.addFromString(grammar, 1)
          recognition.grammars = speechRecognitionList
          recognition.continuous = false
          recognition.lang = 'zh-CN'
          recognition.interimResults = false
          recognition.maxAlternatives = 1

          recognition.start()

          recognition.onstart = () => {
            console.log('语音识别已启动')
          }

          recognition.onresult = (event) => {
            const speechResult = event.results[0]
            console.log('你说了：', speechResult[0].transcript)
            console.log('置信度：', speechResult[0].confidence)
            setMessageContent(speechResult[0].transcript)

            // 如果有替代选项
            if (speechResult.length > 1) {
              console.log('替代选项：', speechResult[1].transcript)
            }
          }

          recognition.onerror = (event) => {
            console.error('语音识别错误：' + event.error)
          }

          recognition.onspeechstart = () => {
            console.log('开始说话')
          }

          recognition.onspeechend = () => {
            console.log('结束说话')
            recognition.stop()
          }
        } else {
          console.error('当前浏览器不支持语音识别。')
        }
      })
      .catch((error) => {
        console.error('获取麦克风权限失败: ', error)
        if (error.name === 'NotAllowedError') {
          alert('请检查浏览器设置，确保授予麦克风权限。')
        }
      })
  }

  // const speechSynthesis = () => {
  //   const synth = window.speechSynthesis
  //   const voices = synth.getVoices()

  //   for (const voice of voices) {
  //     const option = document.createElement('option')
  //     option.textContent = `${voice.name} (${voice.lang})`

  //     if (voice.default) {
  //       option.textContent += ' — DEFAULT'
  //     }

  //     option.setAttribute('data-lang', voice.lang)
  //     option.setAttribute('data-name', voice.name)
  //   }
  // }

  const onRecordClose = () => {
    setShowRecord(false)
  }

  return (
    <div className='flex h-[200px] w-full flex-col px-[12px]'>
      <Modal
        visible={showRecord}
        title={t('chat_record')}
        onCancel={onRecordClose}
        maskClosable={false}
        width={500}
        footer={null}
        backgroundColor='#1d1d1d'
        color='#b0b3b5'
      >
        <ChatRecord open={showRecord} />
      </Modal>
      <div className="relative flex h-[40px] w-full items-center after:absolute after:top-0 after:h-[0.5px] after:w-full after:bg-gray-border after:content-['']">
        <Popup
          left={0}
          bottom={50}
          height={300}
          title={t('emoji')}
          content={
            <Emoji
              messageContent={messageContent}
              setMessageContent={setMessageContent}
              textAreaRef={textAreaRef.current}
            />
          }
        >
          <Button type='text'>
            <Icon type='emoji' style={{ fill: '#b0b3b5' }} />
            {t('emoji')}
          </Button>
        </Popup>
        <Button type='text' onClick={() => setShowRecord(true)}>
          <Icon type='chat_record' style={{ fill: '#b0b3b5' }} />
          {t('chat_record')}
        </Button>
        <Button type='text' onClick={handleSpeedRecognition}>
          <Icon type='microphone' style={{ fill: '#b0b3b5' }} />
          {t('speed_recognition')}
        </Button>
        {/* <Button type='text' onClick={() => getFile()}>
          <Icon type='file' style={{ fill: '#b0b3b5' }} />
          {t('file')}
        </Button> */}
      </div>
      <textarea
        className='box-border h-[calc(100%-80px)] w-full resize-none overflow-hidden border-none bg-transparent text-[15px] text-text-lighter outline-none'
        ref={textAreaRef}
        placeholder={t('chat_placeholder')}
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        onPaste={(e) => console.log(e.clipboardData.getData('text'))}
      />
      <div className='h-[30px] w-full'></div>
    </div>
  )
}
