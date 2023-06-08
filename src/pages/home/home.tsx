import { useEffect, useState } from 'react'
import { HomeWrapper, ChatWrapper } from './atoms'
import { useNavigate } from 'react-router-dom'
import { Modal } from '@/common/components/modal'
import { AuthService } from '@/shared/services'
import { useAPI, useGlobalState, useIntlLocale } from '@/hook'
import { ActionType } from '@/context'
import { ChatMessage } from './chat-message'
import { ChatHeader } from './chat-header'
import { ChatSend } from './chat-send'
import { Lottie } from '@/common/components'
import catAnimationData from '@/common/json/lottie/creepy-black-cat.json'
// import Worker from '@/utils/worker-example.ts?worker'

export const HomeView = () => {
  const API = useAPI()
  const navigate = useNavigate()
  const t = useIntlLocale()
  const { dispatch } = useGlobalState()
  const [isShowChat, setIsShowChat] = useState(false)
  const [isShowPopup, setIsShowPopup] = useState(true)
  const { state } = useGlobalState()
  const { userInfo } = state
  // const worker = new Worker()

  // worker.addEventListener('message', (e) => {
  //   console.log(e)
  // })

  useEffect(() => {
    API.user.getUserInfo().then((res) => {
      if (res.success) {
        dispatch({ type: ActionType.SetUserInfo, payload: res.data })
      }
    })
    setIsShowPopup(true)
    Notification.requestPermission(function (status) {
      console.log(status) // 仅当值为 "granted" 时显示通知
    })
    return () => {}
  }, [])

  const cancelPopup = () => {
    navigate('/login')
    AuthService.removeToken()
  }

  const okPopup = () => {
    setIsShowPopup(false)
    setIsShowChat(true)
  }

  return (
    <HomeWrapper>
      {isShowChat ? (
        <ChatWrapper>
          <div className='absolute -top-21.5'>
            <Lottie animationData={catAnimationData} />
          </div>
          <ChatHeader />
          <ChatMessage />
          <ChatSend />
        </ChatWrapper>
      ) : (
        <Modal
          visible={isShowPopup}
          title={t('welcome_title')}
          onCancel={cancelPopup}
          onOk={okPopup}
          maskClosable={false}
        >
          {userInfo.id === 6 ? t('welcome_baby') : t('welcome_message')}
        </Modal>
      )}
    </HomeWrapper>
  )
}
