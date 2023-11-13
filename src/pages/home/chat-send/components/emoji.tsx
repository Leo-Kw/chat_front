import { emojiArr } from '@/constants'
import { emojiByCode } from '@/utils'
import { EmojiProps } from '../../type'

export const Emoji = ({ messageContent, setMessageContent }: EmojiProps) => (
  <div className='flex flex-wrap gap-[10px]'>
    {emojiArr.map((item) => (
      <div
        key={item}
        onClick={() => setMessageContent(messageContent + emojiByCode(item))}
        className='flex cursor-pointer items-center justify-center rounded-[4px] px-[8px] py-[4px] transition-all duration-300 hover:bg-gray-main'
      >
        {emojiByCode(item)}
      </div>
    ))}
  </div>
)
