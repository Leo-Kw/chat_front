import React from 'react'
import { MessageWrapper, MessageContent, MessageItem } from './atoms'

export const ChatMessage = () => {
  return (
    <MessageWrapper>
      <MessageContent>
        <MessageItem type='myself'>
          <div>skjadldkj</div>
        </MessageItem>
        <MessageItem type='other'>
          <div>skjadldkj</div>
        </MessageItem>
      </MessageContent>
    </MessageWrapper>
  )
}
