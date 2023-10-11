import { useEffect, useCallback, useState, useRef } from 'react'
import { useGlobalState, useIntlLocale, useSocket } from '@/hook'
import { scorllToBottom, strToUnicode } from '@/utils'
import { AuthService } from '@/shared/services'
import { Popup, Icon, Button } from '@/common/components'
import { Emoji } from '../chat-tool-bar'
import { regex } from '@/utils/regex'

const pickerOpts = {
  types: [
    {
      description: 'code',
      accept: {
        '*/*': [],
      },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
}

export const ChatSend = () => {
  const socket = useSocket()
  const t = useIntlLocale()
  const { state } = useGlobalState()
  const [messageContent, setMessageContent] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const [isInput, setIsInput] = useState(false)
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
          messageContent: messageContent.match(regex)
            ? strToUnicode(messageContent)
            : messageContent,
          messageType: messageContent.match(regex) ? 'hasEmoji' : 'text',
        },
        (res: boolean) => {
          res && scorllToBottom()
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

  const getFile = async () => {
    try {
      const [fileHandle] = await showOpenFilePicker(pickerOpts)
      const file = await fileHandle.getFile()
      console.log(file)
    } catch (e) {
      // Handling of user rejection
    }
  }

  return (
    <div className='flex w-full h-[200px] px-[12px] flex-col'>
      <div className="relative h-[40px] w-full flex items-center after:content-[''] after:w-full after:h-[0.5px] after:bg-gray-border after:absolute after:top-0">
        <Popup
          left={0}
          bottom={50}
          height={300}
          title={t('emoji')}
          content={<Emoji messageContent={messageContent} setMessageContent={setMessageContent} />}
        >
          <Button type='text'>
            <Icon type='emoji' style={{ fill: '#b0b3b5' }} />
            {t('emoji')}
          </Button>
        </Popup>
        <Button type='text'>
          <Icon type='chat_record' style={{ fill: '#b0b3b5' }} />
          {t('chat_record')}
        </Button>
        <Button type='text' onClick={() => getFile()}>
          <Icon type='file' style={{ fill: '#b0b3b5' }} />
          {t('file')}
        </Button>
      </div>
      <textarea
        className='w-full h-[calc(100% - 80px)] overflow-hidden box-border resize-none outline-none border-none text-[15px] text-text-lighter bg-transparent'
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
