import { useEffect, useState } from 'react'
import { HomeWrapper, ChatWrapper } from './atoms'
import { Modal } from '@/common/components/modal'
import { useSocket } from '@/hook/use-socket'
import { useAPI } from '@/hook'

export const HomeView = () => {
  const API = useAPI()
  const socket = useSocket()
  const [isShowChat, setIsShowChat] = useState(false)
  const [isShowPopup, setIsShowPopup] = useState(true)

  console.log(
    socket.on('connection', (socket) => {
      console.log(socket)
    })
  )

  useEffect(() => {
    setIsShowPopup(true)
  }, [])

  const cancelPopup = () => {
    setIsShowPopup(false)
    setIsShowChat(true)
  }

  const okPopup = () => {
    socket.emit('socketTest', { test: '测试数据' }, (data: any) => {
      console.log(data) // { msg1: '测试1', msg2: '测试2' }
    })
  }

  return (
    <HomeWrapper>
      {isShowChat ? (
        <ChatWrapper>
          <button onClick={okPopup}>asdasdasdas</button>
        </ChatWrapper>
      ) : (
        <Modal
          visible={isShowPopup}
          title='123'
          onCancel={cancelPopup}
          onOk={() => API.chat.test({ a: 123 })}
          maskClosable={false}
        >
          123
        </Modal>
      )}
    </HomeWrapper>
  )
}
