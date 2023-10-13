import { useCallback, useEffect, useRef, useState } from 'react'
import { useAPI, useGlobalState, useIntlLocale, useSocket } from '@/hook'
import { MessageTypes, SocketOnMessage } from '../type'
import { scorllToBottom, substringByByte, throttle } from '@/utils'
import { ActionType } from '@/context'
import { Icon, Toast } from '@/common/components'
import { CSSTransition } from 'react-transition-group'

export const ChatMessage = () => {
  const API = useAPI()
  const socket = useSocket()
  const messContentRef = useRef<HTMLDivElement | null>(null)
  const unReadTipRef = useRef<HTMLDivElement | null>(null)
  const t = useIntlLocale()
  const { state, dispatch } = useGlobalState()
  const [isLoadAllMessage, setIsLoadAllMessage] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [imgLoadSuccess, setImgLoadSuccess] = useState(true)
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
      isFirstLoad && (currentRef.current.scrollTop = currentRef.current.scrollHeight)
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

  const scrollToTop = throttle(() => {
    if (messContentRef && messContentRef.current) {
      const el = messContentRef.current
      const { scrollTop, offsetHeight, scrollHeight } = el
      offsetHeight + scrollTop - scrollHeight > -450 &&
        dispatch({ type: ActionType.ClearUnreadMessNum })
      scrollTop < 30 && setMessageParams({ ...messageParams, page: ++messageParams.page })
    }
  }, 200)

  const getMessageList = () => {
    !isLoadAllMessage &&
      API.chat.getMessage({ ...messageParams, roomId }).then((res) => {
        if (res.result) {
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
      if (data.data.userInfo.id !== userInfo.id) {
        dispatch({ type: ActionType.AddOneUnreadMessNum })
        const options = {
          body: t('has_new_news'),
          tag: 'chat',
          icon: '/src/favicon.png',
          requireInteraction: false,
        } // 传空配置
        const title = t('hange_chat_room')
        new Notification(title, options) // 显示通知
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [messageList, messContentRef]
  )

  const readNewMess = () => {
    scorllToBottom()
    dispatch({ type: ActionType.ClearUnreadMessNum })
  }

  return (
    <div className='flex-1 h-0 relative'>
      <div
        ref={messContentRef}
        className='h-full px-[25px] py-[10px] box-border overflow-y-scroll flex flex-col relative scrollbar'
      >
        {messageList.map((item) => {
          const isMyself = item.userInfo.id === userInfo.id
          return (
            <div
              key={item.id}
              id={`${item.id}`}
              className={`flex ${
                isMyself ? 'justify-end' : 'justify-start'
              } my-[10px] text-text-lighter`}
            >
              <div className={`flex ${isMyself ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className='w-[50px] h-[50px] rounded-[5px] flex justify-center items-center bg-gray-200 overflow-hidden [&>img]:w-full [&>img]:h-full [&>img]:object-contain'>
                  {item.userInfo.avatar && imgLoadSuccess ? (
                    <img
                      src={item.userInfo.avatar}
                      alt='avatar'
                      onLoad={() => setImgLoadSuccess(true)}
                      onError={() => setImgLoadSuccess(false)}
                    />
                  ) : (
                    <Icon type='default-avatar' style={{ width: '35px', height: '35px' }} />
                  )}
                </div>
                <div
                  className={`flex flex-col ${isMyself ? 'items-end' : 'items-start'} mx-[15px]`}
                >
                  <div className='mb-[5px] text-[14px] text-textSa text-ellipsis overflow-hidden max-w-[200px]'>
                    {item.userInfo.name}
                  </div>
                  <div
                    className={`text-dark-main rounded-[5px] max-w-[350px] py-[5px] px-[15px] h-auto relative break-all before:content-[''] before:border-solid before:border-transparent before:h-0 before:absolute before:w-0 before:border-[5px] before:top-[12px] ${
                      isMyself
                        ? 'bg-messageBackground-myself before:left-full before:border-l-messageBackground-myself'
                        : 'bg-messageBackground-other before:right-full before:border-r-messageBackground-other'
                    }`}
                  >
                    {item.messageType === MessageTypes.HasEmoji
                      ? substringByByte(item.messageContent, 100000)
                      : item.messageContent}
                  </div>
                </div>
              </div>
            </div>
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
          className='absolute right-[15px] bottom-[10px] py-[7px] px-[13px] text-[12px] text-white bg-warning rounded-[6px] font-bold cursor-pointer'
        >
          有{unreadMessNum}条新消息
        </div>
      </CSSTransition>
    </div>
  )
}
