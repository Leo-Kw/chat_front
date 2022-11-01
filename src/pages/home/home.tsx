import { useEffect, useState } from 'react'
import { HomeWrapper, ChatWrapper } from './atoms'
import { useNavigate } from 'react-router-dom'
import { Modal } from '@/common/components/modal'
import { AuthService } from '@/shared/services'
import { ChatMessage, ChatHeader, ChatSend } from './components'
import { useAPI, useGlobalState } from '@/hook'
import { ActionType } from '@/context'
// import Worker from '@/utils/worker-example.ts?worker'

export const HomeView = () => {
  const API = useAPI()
  const navigate = useNavigate()
  const { dispatch } = useGlobalState()
  const [isShowChat, setIsShowChat] = useState(false)
  const [isShowPopup, setIsShowPopup] = useState(true)
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
          <ChatHeader />
          <ChatMessage />
          <ChatSend />
        </ChatWrapper>
      ) : (
        <Modal
          visible={isShowPopup}
          title='欢迎加入聊天室'
          onCancel={cancelPopup}
          onOk={okPopup}
          maskClosable={false}
        >
          请注意，加入聊天室将自动播放音乐!
        </Modal>
      )}
    </HomeWrapper>
  )
}
