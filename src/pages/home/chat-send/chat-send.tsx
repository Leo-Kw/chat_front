import { useEffect, useCallback, useState, useRef } from 'react'
import { useGlobalState, useIntlLocale, useSocket, useSpeed } from '../../../hook'
import { scrollToBottom } from '../../../utils'
import { AuthService } from '../../../shared/services'
import { Popup, Icon, Button, Modal } from '../../../common/components'
import { ChatRecord, Emoji, Video } from './components'

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

export const ChatSend = () => {
  const socket = useSocket()
  const t = useIntlLocale()
  const { state } = useGlobalState()
  const [messageContent, setMessageContent] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const [isInput, setIsInput] = useState(false)
  const [showRecord, setShowRecord] = useState(false)
  const { userInfo } = state
  const { handleSpeedRecognition } = useSpeed({ setMessageContent })

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
          if (res) scrollToBottom()
        }
      )
      setMessageContent('')
    }
  }, [socket, userInfo, messageContent])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        if (!isInput && messageContent) sendMessage()
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
            <span className='max-md:hidden'>{t('emoji')}</span>
          </Button>
        </Popup>
        <Button type='text' onClick={() => setShowRecord(true)}>
          <Icon type='chat_record' style={{ fill: '#b0b3b5' }} />
          <span className='max-md:hidden'>{t('chat_record')}</span>
        </Button>
        <Button type='text' onClick={handleSpeedRecognition}>
          <Icon type='microphone' style={{ fill: '#b0b3b5' }} />
          <span className='max-md:hidden'>{t('speed_recognition')}</span>
        </Button>
        <Popup left={0} bottom={50} height={200} title={t('emoji')} content={<Video />}>
          <Button type='text'>
            <Icon type='video' style={{ fill: '#b0b3b5' }} />
            <span className='max-md:hidden'>{t('video')}</span>
          </Button>
        </Popup>
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
