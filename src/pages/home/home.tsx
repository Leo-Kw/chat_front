import { useEffect } from 'react'
import { useAPI, useGlobalState } from '../../hook'
import { ActionType } from '../../context'
import { ChatMessage } from './chat-message'
import { ChatHeader } from './chat-header'
import { ChatSend } from './chat-send'
import { Lottie } from '../../common/components'
import catAnimationData from '../../common/json/lottie/creepy-black-cat.json'
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

    // if ('geolocation' in navigator) {
    //   navigator.geolocation.getCurrentPosition((res) => {
    //     console.log(res)
    //   })
    // }
    return () => {}
  }, [dispatch, API])

  return (
    <div className='flex items-center justify-center'>
      <div className='fixed inset-x-[12%] inset-y-[8%] flex flex-col rounded-[10px] shadow-[0_0_15px_#f2f2f2]'>
        <div className='absolute -top-14 w-24'>
          <Lottie animationData={catAnimationData} />
        </div>
        <ChatHeader />
        <ChatMessage />
        <ChatSend />
      </div>
    </div>
  )
}
