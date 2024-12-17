import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useAPI, useGlobalState, useIntlLocale, useSocket } from '../../../hook'
import { SocketOnMessage } from '../type'
import { formatDate, scrollToBottom, throttle, withinFiveMinutes } from '../../../utils'
import { ActionType } from '../../../context'
import { Toast } from '../../../common/components'
import { CSSTransition } from 'react-transition-group'
import { MessageItem } from './message-item'

export const ChatMessage = () => {
  const API = useAPI()
  const socket = useSocket()
  const messContentRef = useRef<HTMLDivElement | null>(null)
  const unReadTipRef = useRef<HTMLDivElement | null>(null)
  const t = useIntlLocale()
  const { state, dispatch } = useGlobalState()
  const [isLoadAllMessage, setIsLoadAllMessage] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [messageParams, setMessageParams] = useState({
    page: 1,
    pageSize: 20,
  })
  const { userInfo, messageList, roomId, unreadMessNum } = state

  useEffect(() => {
    const currentRef = messContentRef
    socket.on('message', handleMessage) // 监听消息
    if (currentRef && currentRef.current) {
      currentRef.current.addEventListener('scroll', scrollToTop)
      if (isFirstLoad) currentRef.current.scrollTop = currentRef.current.scrollHeight
    }
    return () => {
      socket.off('message', handleMessage)
      if (currentRef && currentRef.current) {
        currentRef.current.removeEventListener('scroll', scrollToTop)
      }
      setIsFirstLoad(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, state])

  useEffect(() => {
    getMessageList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageParams])

  useEffect(() => {
    if (messageParams.page === 1) {
      scrollToBottom('messageBottom', 'auto')
    }
  }, [messageList, messageParams])

  const scrollToTop = throttle(() => {
    if (messContentRef && messContentRef.current) {
      const el = messContentRef.current
      const { scrollTop, offsetHeight, scrollHeight } = el
      if (offsetHeight + scrollTop - scrollHeight > -450)
        dispatch({ type: ActionType.ClearUnreadMessNum })
      if (scrollTop < 30) setMessageParams({ ...messageParams, page: ++messageParams.page })
    }
  }, 200)

  const getMessageList = () => {
    if (!isLoadAllMessage)
      API.chat.getMessage({ ...messageParams, roomId }).then((res) => {
        if (res.result) {
          if (res.data.length < messageParams.pageSize && messageParams.page !== 1) {
            Toast.success(t('load_all_message'))
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
      if (data.data.userInfo.id !== userInfo.id) {
        dispatch({ type: ActionType.AddOneUnreadMessNum })
        const options = {
          body: t('has_new_news'),
          tag: 'chat',
          icon: '/src/favicon.png',
          requireInteraction: false,
        } // 传空配置
        const title = t('hang_ge_chat_room')
        new Notification(title, options) // 显示通知
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [messageList, messContentRef]
  )

  const readNewMess = () => {
    scrollToBottom()
    dispatch({ type: ActionType.ClearUnreadMessNum })
  }

  return (
    <div className='relative h-0 flex-1'>
      <div
        ref={messContentRef}
        className='scrollbar relative box-border flex h-full flex-col overflow-y-scroll px-[25px] py-[10px]'
      >
        {messageList.map((item, index) => {
          const isMyself = item.userInfo.id === userInfo.id
          return (
            <Fragment key={item.id}>
              {index > 0 &&
                !withinFiveMinutes(item.createdAt, messageList[index - 1].createdAt) && (
                  <div className='flex justify-center text-xs text-text-dark'>
                    {formatDate(item.createdAt)}
                  </div>
                )}
              {index === 0 && (
                <div className='flex justify-center text-xs text-text-dark'>
                  {formatDate(item.createdAt)}
                </div>
              )}
              <MessageItem item={item} isMyself={isMyself} />
            </Fragment>
          )
        })}
        <div id='messageBottom' />
      </div>
      <CSSTransition
        nodeRef={unReadTipRef}
        in={unreadMessNum !== 0}
        timeout={300}
        classNames={{
          enter: 'opacity-0',
          enterActive: 'transition-all opacity-100 duration-300 ease-in-out',
          exit: 'translate-y-0',
          exitActive: 'transition-all translate-y-1/2 duration-300 ease-in-out',
        }}
        unmountOnExit
      >
        <div
          ref={unReadTipRef}
          onClick={readNewMess}
          className='absolute bottom-[10px] right-[15px] cursor-pointer rounded-[6px] bg-warning px-[13px] py-[7px] text-[12px] font-bold text-white'
        >
          有{unreadMessNum}条新消息
        </div>
      </CSSTransition>
    </div>
  )
}
