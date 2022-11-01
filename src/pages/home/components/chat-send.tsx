import { useEffect, useCallback, useState, useRef } from 'react'
import { sendBarConfig } from '@/constants'
import { SendWrapper, SendHeader, ChatButton, SendTextarea, SendFooter } from './atoms'
import { Icon, IconType } from '@/common/components/icon'
import { useGlobalState, useIntlLocale, useSocket } from '@/hook'
import { scorllToBottom } from '@/utils'
import { AuthService } from '@/shared/services'

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
          messageContent: messageContent,
          messageType: 'text',
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

  return (
    <SendWrapper>
      <SendHeader>
        {sendBarConfig.map((item) => (
          <ChatButton typeKey='send' key={item.key}>
            <Icon type={item.value as IconType} />
            {t(item.value)}
          </ChatButton>
        ))}
      </SendHeader>
      <SendTextarea
        ref={textAreaRef}
        placeholder={t('chat_placeholder')}
        value={messageContent}
        onChange={(e) => setMessageContent(e.target.value)}
        onPaste={(e) => console.log(e.target)}
      />
      <SendFooter></SendFooter>
    </SendWrapper>
  )
}
