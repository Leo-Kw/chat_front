import { useEffect } from 'react'
import { useAPI, useGlobalState } from '@/hook'
import { ActionType } from '@/context'
import { ChatMessage } from './chat-message'
import { ChatHeader } from './chat-header'
import { ChatSend } from './chat-send'
import { Lottie } from '@/common/components'
import catAnimationData from '@/common/json/lottie/creepy-black-cat.json'
// import Worker from '@/utils/worker-example.ts?worker'

export const HomeView = () => {
  const API = useAPI()
  const { dispatch } = useGlobalState()
  // const worker = new Worker()

  // worker.addEventListener('message', (e) => {
  //   console.log(e)
  // })

  useEffect(() => {
    API.user.getUserInfo().then((res) => {
      if (res.result) {
        dispatch({ type: ActionType.SetUserInfo, payload: res.data })
      }
    })
    Notification.requestPermission(function (status) {
      console.log(status) // 仅当值为 "granted" 时显示通知
    })
    return () => {}
  }, [dispatch, API])

  return (
    <div className='flex justify-center items-center'>
      <div className='flex flex-col fixed left-[12%] right-[12%] top-[8%] bottom-[8%] shadow-[0_0_15px_#f2f2f2] rounded-[10px]'>
        <div className='absolute w-24 -top-14'>
          <Lottie animationData={catAnimationData} />
        </div>
        <ChatHeader />
        <ChatMessage />
        <ChatSend />
      </div>
    </div>
  )
}
