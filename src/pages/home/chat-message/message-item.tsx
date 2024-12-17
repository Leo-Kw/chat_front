import { useState } from 'react'
import { RecordResponse } from '../../../shared/services'
import { Icon } from '../../../common/components'

interface Props {
  item: RecordResponse
  isMyself: boolean
}

export const MessageItem = ({ item, isMyself }: Props) => {
  const [imgLoadSuccess, setImgLoadSuccess] = useState(true)

  return (
    <>
      <div
        id={`${item.id}`}
        className={`flex ${isMyself ? 'justify-end' : 'justify-start'} my-[10px] text-text-lighter`}
      >
        <div className={`flex ${isMyself ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className='flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-[5px] bg-gray-200 [&>img]:h-full [&>img]:w-full [&>img]:object-contain'>
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
            <div className='mb-[5px] max-w-[200px] overflow-hidden text-ellipsis text-[14px]'>
              {item.userInfo.name}
            </div>
            <div
              className={`relative h-auto max-w-[350px] break-all rounded-[5px] px-[15px] py-[5px] text-dark-main before:absolute before:top-[12px] before:h-0 before:w-0 before:border-[5px] before:border-solid before:border-transparent before:content-[''] ${
                isMyself
                  ? 'bg-messageBackground-myself before:left-full before:border-l-messageBackground-myself'
                  : 'bg-messageBackground-other before:right-full before:border-r-messageBackground-other'
              }`}
            >
              {item.messageContent}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
