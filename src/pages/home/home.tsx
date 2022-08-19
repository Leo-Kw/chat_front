import React, { useEffect, useState } from 'react'
import { HomeWrapper } from './atoms'
import { Modal } from '@/common/components/modal'

export const HomeView = () => {
  const [isShowChat] = useState(false)
  const [isShowPopup, setIsShowPopup] = useState(true)

  useEffect(() => {
    setIsShowPopup(true)
  }, [])

  const cancelPopup = () => {
    setIsShowPopup(false)
  }

  return (
    <HomeWrapper>
      {isShowChat ? (
        <></>
      ) : (
        <Modal visible={isShowPopup} title='123' onCancel={cancelPopup} maskClosable={false}>
          123
        </Modal>
      )}
    </HomeWrapper>
  )
}
