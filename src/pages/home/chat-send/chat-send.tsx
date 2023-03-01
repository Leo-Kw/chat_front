import { useEffect, useCallback, useState, useRef } from 'react'
import { SendWrapper, SendHeader, ChatButton, SendTextarea, SendFooter } from './atoms'
import { Icon } from '@/common/components/icon'
import { useGlobalState, useIntlLocale, useSocket } from '@/hook'
import { scorllToBottom, strToUnicode } from '@/utils'
import { AuthService } from '@/shared/services'
import { Popup } from '@/common/components'
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

  const sendMessage = () => {
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
          userName: userInfo.name,
          userRole: userInfo.role,
          userAvatar: userInfo.avatar,
        },
        (res: boolean) => {
          res && scorllToBottom()
        }
      )
      setMessageContent('')
    }
  }

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        !isInput && messageContent && sendMessage()
        return
      }
    },
    [sendMessage]
  )

  const inputStart = () => {
    setIsInput(true)
  }

  const inputEnd = () => {
    setIsInput(false)
  }

  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.addEventListener('keydown', handleKeyDown)
      textAreaRef.current.addEventListener('compositionstart', inputStart, false)
      textAreaRef.current.addEventListener('compositionend', inputEnd, false)
    }
    return () => {
      if (textAreaRef && textAreaRef.current) {
        textAreaRef.current.removeEventListener('keydown', handleKeyDown)
        textAreaRef.current.removeEventListener('compositionstart', inputStart)
        textAreaRef.current.removeEventListener('compositionend', inputEnd)
      }
    }
  }, [handleKeyDown])

  const getFile = async () => {
    try {
      const [fileHandle] = await showOpenFilePicker(pickerOpts)
      const file = await fileHandle.getFile()
      const contents = await file.text()
      console.log(contents)
    } catch (e) {
      // Handling of user rejection
    }
  }

  return (
    <SendWrapper>
      <SendHeader>
        <Popup
          left={15}
          bottom={200}
          height={300}
          title={t('emoji')}
          content={<Emoji messageContent={messageContent} setMessageContent={setMessageContent} />}
        >
          <ChatButton typeKey='send'>
            <Icon type='emoji' />
            {t('emoji')}
          </ChatButton>
        </Popup>
        {/* <ChatButton typeKey='send'>
          <Icon type='song' />
          {t('song')}
        </ChatButton> */}
        <ChatButton typeKey='send'>
          <Icon type='chat_record' />
          {t('chat_record')}
        </ChatButton>
        <ChatButton typeKey='send' onClick={() => getFile()}>
          <Icon type='file' />
          {t('file')}
        </ChatButton>
      </SendHeader>
      <SendTextarea
        ref={textAreaRef}
        placeholder={t('chat_placeholder')}
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        onPaste={(e) => console.log(e.clipboardData.getData('text'))}
      />
      <SendFooter></SendFooter>
    </SendWrapper>
  )
}
