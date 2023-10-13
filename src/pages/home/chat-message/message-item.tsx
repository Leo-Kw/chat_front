import { useState } from 'react'
import { RecordResponse } from '@/shared/services'
import { Icon } from '@/common/components'
import { MessageTypes } from '../type'
import { substringByByte } from '@/utils'

interface Props {
  item: RecordResponse
  isMyself: boolean
}

export const MessageItem = ({ item, isMyself }: Props) => {
  const [imgLoadSuccess, setImgLoadSuccess] = useState(true)

  return (
    <div
      id={`${item.id}`}
      className={`flex ${isMyself ? 'justify-end' : 'justify-start'} my-[10px] text-text-lighter`}
    >
      <div className={`flex ${isMyself ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className='w-[50px] h-[50px] rounded-[5px] flex justify-center items-center bg-gray-200 overflow-hidden [&>img]:w-full [&>img]:h-full [&>img]:object-contain'>
          {item.userInfo.avatar && imgLoadSuccess ? (
            <img
              src={item.userInfo.avatar}
              alt='avatar'
              onLoad={() => setImgLoadSuccess(true)}
              onError={() => setImgLoadSuccess(false)}
            />
          ) : (
            <Icon type='default-avatar' style={{ width: '35px', height: '35px' }} />
          )}
        </div>
        <div className={`flex flex-col ${isMyself ? 'items-end' : 'items-start'} mx-[15px]`}>
          <div className='mb-[5px] text-[14px] text-textSa text-ellipsis overflow-hidden max-w-[200px]'>
            {item.userInfo.name}
          </div>
          <div
            className={`text-dark-main rounded-[5px] max-w-[350px] py-[5px] px-[15px] h-auto relative break-all before:content-[''] before:border-solid before:border-transparent before:h-0 before:absolute before:w-0 before:border-[5px] before:top-[12px] ${
              isMyself
                ? 'bg-messageBackground-myself before:left-full before:border-l-messageBackground-myself'
                : 'bg-messageBackground-other before:right-full before:border-r-messageBackground-other'
            }`}
          >
            {item.messageType === MessageTypes.HasEmoji
              ? substringByByte(item.messageContent, 100000)
              : item.messageContent}
          </div>
        </div>
      </div>
    </div>
  )
}
