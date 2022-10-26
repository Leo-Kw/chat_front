import { useCallback, useEffect, useRef, useState } from 'react'
import { useAPI, useGlobalState, useIntlLocale, useSocket } from '@/hook'
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
import { scorllToBottom, throttle } from '@/utils'
import { ActionType } from '@/context'
import { Toast } from '@/common/components'

export const ChatMessage = () => {
  const API = useAPI()
  const socket = useSocket()
  const messContentRef = useRef<HTMLDivElement | null>(null)
  const t = useIntlLocale()
  const { state, dispatch } = useGlobalState()
  const [isLoadAllMessage, setIsLoadAllMessage] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [messageParams, setMessageParams] = useState({
    page: 1,
    pageSize: 20,
  })
  const { userInfo, messageList, roomId } = state

  useEffect(() => {
    socket.on('message', handleMessage) // 监听消息
    if (messContentRef && messContentRef.current) {
      messContentRef.current.addEventListener('scroll', scrollToTop)
    }
    isFirstLoad && scorllToBottom()
    return () => {
      socket.off('message', handleMessage)
      if (messContentRef && messContentRef.current) {
        messContentRef.current.removeEventListener('scroll', scrollToTop)
      }
      setIsFirstLoad(false)
    }
  }, [socket, state])

  useEffect(() => {
    getMessageList()
  }, [messageParams])

  const scrollToTop = throttle(() => {
    if (messContentRef && messContentRef.current) {
      const el = messContentRef.current
      const { scrollTop } = el
      scrollTop < 30 && setMessageParams({ ...messageParams, page: ++messageParams.page })
    }
  }, 200)

  const getMessageList = () => {
    !isLoadAllMessage &&
      API.chat.getMessage({ ...messageParams, roomId }).then((res) => {
        if (res.success) {
          if (res.data.length < messageParams.pageSize) {
            Toast.warn(t('load_all_message'))
            setIsLoadAllMessage(true)
            return
          }
          document.getElementById(`${state.messageList[0]?.id}`)?.scrollIntoView()
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
            <MessageItem key={item.id} id={`${item.id}`} isMyself={isMyself}>
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
