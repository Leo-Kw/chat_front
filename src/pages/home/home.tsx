import { useEffect, useState } from 'react'
import { HomeWrapper, ChatWrapper } from './atoms'
import { useNavigate } from 'react-router-dom'
import { Modal } from '@/common/components/modal'
import { AuthService } from '@/shared/services'
import { ChatMessage, ChatHeader, ChatSend } from './components'
import { useAPI, useGlobalState } from '@/hook'
import { ActionType } from '@/context'

export const HomeView = () => {
  const API = useAPI()
  const navigate = useNavigate()
  const { state, dispatch } = useGlobalState()
  // const socket = useSocket()
  const [isShowChat, setIsShowChat] = useState(false)
  const [isShowPopup, setIsShowPopup] = useState(true)

  console.log(state)

  useEffect(() => {
    API.user.getUserInfo().then((res) => {
      if (res.success) {
        dispatch({ type: ActionType.SetUserInfo, payload: res.data })
      }
    })
    setIsShowPopup(true)
  }, [])

  const cancelPopup = () => {
    navigate('/login')
    AuthService.removeToken()
  }

  const okPopup = () => {
    setIsShowPopup(false)
    setIsShowChat(true)
  }

  // const test = () => {
  //   socket.emit('socketTest', { test: '测试数据' }, (data: any) => {
  //     console.log(data)
  //   })
  // }

  return (
    <HomeWrapper>
      {isShowChat ? (
        <ChatWrapper>
          {/* <button onClick={okPopup}>asdasdasdas</button> */}
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
