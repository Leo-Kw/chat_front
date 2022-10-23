import { useState } from 'react'
import { HomeWrapper, ChatWrapper } from './atoms'
import { useNavigate } from 'react-router-dom'
import { Modal } from '@/common/components/modal'
import { AuthService } from '@/shared/services'
import { ChatMessage, ChatHeader, ChatSend } from './components'

export const HomeView = () => {
  const navigate = useNavigate()
  const [isShowChat, setIsShowChat] = useState(false)
  const [isShowPopup, setIsShowPopup] = useState(true)

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
