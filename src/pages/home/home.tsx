import { useEffect, useState } from 'react'
import { HomeWrapper, ChatWrapper } from './atoms'
import { useNavigate } from 'react-router-dom'
import { Modal } from '@/common/components/modal'
// import { useSocket } from '@/hook/use-socket'
// import { useAPI } from '@/hook'
import { AuthService } from '@/shared/services'
import { ChatMessage, ChatHeader, ChatSend } from './components'

export const HomeView = () => {
  // const API = useAPI()
  const navigate = useNavigate()
  // const socket = useSocket()
  const [isShowChat, setIsShowChat] = useState(false)
  const [isShowPopup, setIsShowPopup] = useState(true)

  useEffect(() => {
    setIsShowPopup(true)
  }, [])

  const cancelPopup = () => {
    navigate('/login')
    AuthService.removeToken
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
          {/* <ChatSend /> */}
        </ChatWrapper>
      ) : (
        <Modal
          visible={isShowPopup}
          title='123'
          onCancel={cancelPopup}
          onOk={okPopup}
          maskClosable={false}
        >
          123
        </Modal>
      )}
    </HomeWrapper>
  )
}
