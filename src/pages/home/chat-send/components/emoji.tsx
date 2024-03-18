import { emojiArr } from '@/constants'
import { emojiByCode } from '@/utils'
import { EmojiProps } from '../../type'

export const Emoji = ({ messageContent, setMessageContent, textAreaRef }: EmojiProps) => {
  const handleClick = (item: string) => {
    if (textAreaRef) {
      let startIndex = textAreaRef.selectionStart
      setMessageContent(
        `${messageContent.slice(0, startIndex)}${emojiByCode(item)}${messageContent.slice(
          startIndex
        )}`
      )
      startIndex = startIndex + emojiByCode(item).length
      textAreaRef.focus()
      setTimeout(() => {
        textAreaRef.selectionStart = startIndex
        textAreaRef.selectionEnd = startIndex
      })
    }
  }
  return (
    <div className='flex flex-wrap gap-[10px]'>
      {emojiArr.map((item) => (
        <div
          key={item}
          onClick={() => handleClick(item)}
          className='flex cursor-pointer items-center justify-center rounded-[4px] px-[8px] py-[4px] transition-all duration-300 hover:bg-gray-main'
        >
          {emojiByCode(item)}
        </div>
      ))}
    </div>
  )
}
