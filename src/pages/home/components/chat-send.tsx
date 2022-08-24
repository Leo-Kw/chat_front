import { useEffect, useCallback, useState } from 'react'
import { sendBarConfig } from '@/constants'
import { SendWrapper, SendHeader, ChatButton, SendTextarea, SendFooter } from './atoms'
import { Icon, IconType } from '@/common/components/icon'
import intl from 'react-intl-universal'

export const ChatSend = () => {
  const [messageValue, setMessageValue] = useState('')

  const sendMessage = () => {
    console.log(messageValue)
    setMessageValue('')
  }

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        sendMessage()
        return
      }
    },
    [sendMessage]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <SendWrapper>
      <SendHeader>
        {sendBarConfig.map((item) => (
          <ChatButton typeKey='send' key={item.key}>
            <Icon type={item.value as IconType} />
            {intl.get(item.value)}
          </ChatButton>
        ))}
      </SendHeader>
      <SendTextarea
        placeholder={intl.get('chat_placeholder')}
        value={messageValue}
        onChange={(e) => setMessageValue(e.target.value)}
        onPaste={(e) => console.log(e.target)}
      />
      <SendFooter></SendFooter>
    </SendWrapper>
  )
}
