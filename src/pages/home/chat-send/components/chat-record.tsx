import { Icon } from '@/common/components'
import { useAPI } from '@/hook'
import { RecordResponse } from '@/shared/services'
import { useEffect, useRef, useState } from 'react'

interface Props {
  open: boolean
}

// eslint-disable-next-line @typescript-eslint/ban-types
const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: unknown, ...args: unknown[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

export const ChatRecord = ({ open }: Props) => {
  const API = useAPI()
  const [search, setSearch] = useState('')
  const [searchMessage, setSearchMessage] = useState<RecordResponse[]>([])
  const [imgLoadSuccess, setImgLoadSuccess] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleSearch = (search: string) => {
    API.chat
      .searchHistory({
        page: 1,
        pageSize: 10,
        roomId: 1,
        search: search,
      })
      .then((res) => {
        setSearchMessage(res.data)
      })
      .finally(() => setLoading(false))
  }
  const throttled = useRef(debounce(handleSearch, 200))

  useEffect(() => {
    if (open && search) {
      throttled.current(search)
      setLoading(true)
    }
  }, [search, open])

  return (
    <div className='relative h-[400px] w-[460px]'>
      <input
        className='h-[40px] w-full rounded-md border-none bg-input-background px-[15px] py-[10px] text-text-main duration-300 hover:bg-input-backgroundHover focus:border-[1px] focus:border-solid focus:border-info focus:bg-input-backgroundFocus focus:outline-none'
        placeholder='请输入搜索内容'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className='my-[8px] h-[calc(100%-40px)] w-full overflow-y-scroll'>
        {search ? (
          loading ? (
            <div className='flex h-full w-full items-center justify-center'>
              <Icon
                type='loading'
                style={{ width: '25px', height: '25px', fill: '#dedede' }}
              ></Icon>
            </div>
          ) : searchMessage.length ? (
            searchMessage.map((item) => (
              <div key={item.id} className='mb-[10px] mt-[15px] flex text-text-lighter'>
                <div className='flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-[5px] bg-gray-200 [&>img]:h-full [&>img]:w-full [&>img]:object-contain'>
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
                <div className='mx-[10px] box-border flex flex-1 flex-col border-b border-gray-border pb-[12px]'>
                  <div className='mb-[5px] max-w-[200px] overflow-hidden text-ellipsis text-[14px] text-text-darker'>
                    {item.userInfo.name}
                  </div>
                  <div className={`relative h-auto w-full break-all rounded-[5px] text-text-main`}>
                    {item.messageContent}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='flex h-full w-full items-center justify-center'>
              没有找到“<span className='text-text-main'>{search}</span>”相关内容
            </div>
          )
        ) : (
          <div className='flex h-full w-full items-center justify-center text-text-main'>
            搜索内容不能为空
          </div>
        )}
      </div>
    </div>
  )
}
