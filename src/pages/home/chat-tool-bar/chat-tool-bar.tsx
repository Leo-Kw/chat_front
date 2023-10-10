import { emojiArr } from '@/constants'
import { emojiByCode } from '@/utils'
import { EmojiProps } from '../type'

export const Emoji = ({ messageContent, setMessageContent }: EmojiProps) => (
  <div className='flex flex-wrap gap-[10px]'>
    {emojiArr.map((item) => (
      <div
        key={item}
        onClick={() => setMessageContent(messageContent + emojiByCode(item))}
        className='py-[4px] px-[8px] flex justify-center items-center cursor-pointer rounded-[4px] transition-all duration-300 hover:bg-gray-main'
      >
        {emojiByCode(item)}
      </div>
    ))}
  </div>
)
