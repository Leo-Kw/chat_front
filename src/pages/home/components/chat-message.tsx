import { useCallback, useEffect, useRef, useState } from 'react'
import { useAPI, useGlobalState, useSocket } from '@/hook'
import {
  MessageWrapper,
  MessageContent,
  MessageItem,
  MessageItemWrapper,
  MessageItemAvatar,
  MessageItemContent,
  MessageItemUserName,
  MessageItemTextWrapper,
} from './atoms'
import { SocketOnMessage } from './type'
import { throttle } from '@/utils'
import { ActionType } from '@/context'

export const ChatMessage = () => {
  const API = useAPI()
  const socket = useSocket()
  const messContentRef = useRef<HTMLDivElement | null>(null)
  const [messageParams, setMessageParams] = useState({
    page: 1,
    pageSize: 20,
  })
  const [isLoading, setIsLoading] = useState(false)
  // const [is, setIsScrollTop] = useState(false)
  const { state, dispatch } = useGlobalState()
  const { userInfo, messageList, roomId } = state

  useEffect(() => {
    socket.on('message', handleMessage) // 监听消息
    if (messContentRef && messContentRef.current) {
      messContentRef.current.addEventListener('scroll', scrollToTop)
    }
    // bottomRef && bottomRef.current && bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    return () => {
      socket.off('message', handleMessage)
      if (messContentRef && messContentRef.current) {
        messContentRef.current.removeEventListener('scroll', scrollToTop)
      }
    }
  }, [socket, state])

  useEffect(() => {
    getMessageList()
  }, [messageParams])

  const scrollToTop = throttle(() => {
    if (messContentRef && messContentRef.current) {
      const el = messContentRef.current
      const { scrollTop, offsetHeight, scrollHeight } = el
      scrollTop < 30 && setMessageParams({ ...messageParams, page: ++messageParams.page })
    }
  }, 200)

  const getMessageList = () => {
    setIsLoading(true)
    API.chat.getMessage({ ...messageParams, roomId }).then((res) => {
      if (res.success) {
        setIsLoading(false)
        dispatch({ type: ActionType.SetMessageList, payload: res.data })
      }
    })
  }

  const handleMessage = useCallback(
    (data: SocketOnMessage) => {
      dispatch({ type: ActionType.AddNewMessage, payload: data.data })
    },
    [messageList, messContentRef]
  )

  return (
    <MessageWrapper>
      <MessageContent ref={messContentRef}>
        {messageList.map((item) => {
          const isMyself = item.userId === userInfo.id
          return (
            <MessageItem key={item.id} isMyself={isMyself}>
              <MessageItemWrapper isMyself={isMyself}>
                <MessageItemAvatar />
                <MessageItemTextWrapper isMyself={isMyself}>
                  <MessageItemUserName>{item.userName}</MessageItemUserName>
                  <MessageItemContent isMyself={isMyself}>{item.messageContent}</MessageItemContent>
                </MessageItemTextWrapper>
              </MessageItemWrapper>
            </MessageItem>
          )
        })}
        <div id='messageBottom' />
      </MessageContent>
    </MessageWrapper>
  )
}
