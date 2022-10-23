import { useEffect, useState } from 'react'
import { useAPI, useGlobalState } from '@/hook'
import { MessageWrapper, MessageContent, MessageItem } from './atoms'
import { RecordResponse } from '@/shared/services/api/interface'

export const ChatMessage = () => {
  const API = useAPI()
  const [chatRecord, setChatRecord] = useState<RecordResponse[]>([])
  const { state } = useGlobalState()
  const { userInfo } = state

  console.log(userInfo)

  useEffect(() => {
    API.chat.getRecord({ page: 1, pageSize: 20, roomId: 1 }).then((res) => {
      if (res.data) {
        setChatRecord(res.data)
      }
    })
  }, [])

  return (
    <MessageWrapper>
      <MessageContent>
        {chatRecord.map((item) => (
          <MessageItem key={item.id} isMyself={item.userId === userInfo.id}>
            {item.messageContent}
          </MessageItem>
        ))}
      </MessageContent>
    </MessageWrapper>
  )
}
