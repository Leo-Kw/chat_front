import { emojiArr } from '@/constants'
import { emojiByCode } from '@/utils'
import { EmojiProps } from '../type'
import { EmojiWrapper, EmojiItem } from './atoms'

export const Emoji = ({ messageContent, setMessageContent }: EmojiProps) => (
  <EmojiWrapper>
    {emojiArr.map((item) => (
      <EmojiItem key={item} onClick={() => setMessageContent(messageContent + emojiByCode(item))}>
        {emojiByCode(item)}
      </EmojiItem>
    ))}
  </EmojiWrapper>
)
