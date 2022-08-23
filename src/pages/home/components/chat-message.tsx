import React from 'react'
import { MessageWrapper, MessageItem } from './atoms'

export const ChatMessage = () => {
  return (
    <MessageWrapper>
      <MessageItem type='myself'>
        <div>skjadldkj</div>
      </MessageItem>
      <MessageItem type='other'>
        <div>skjadldkj</div>
      </MessageItem>
    </MessageWrapper>
  )
}
