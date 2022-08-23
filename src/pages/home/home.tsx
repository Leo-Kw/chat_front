import React, { useEffect, useState } from 'react'
import { ChatWrapper, HomeWrapper } from './atoms'
import { Modal } from '@/common/components/modal'

export const HomeView = () => {
  const [isShowChat, setIsShowChat] = useState(false)
  const [isShowPopup, setIsShowPopup] = useState(true)

  useEffect(() => {
    setIsShowPopup(true)
  }, [])

  const cancelPopup = () => {
    setIsShowPopup(false)
    setIsShowChat(true)
  }

  return (
    <HomeWrapper>
      {isShowChat ? (
        <ChatWrapper>asd</ChatWrapper>
      ) : (
        <Modal
          visible={isShowPopup}
          title='欢迎来到聊天室'
          onCancel={cancelPopup}
          maskClosable={false}
        >
          进入聊天室将自动播放音乐！
        </Modal>
      )}
    </HomeWrapper>
  )
}
