import { RecordResponse } from '@/shared/services/api/interface'

export interface SocketOnMessage {
  data: RecordResponse
  msg: string
}

export enum MessageTypes {
  Text = 'text',
  HasEmoji = 'hasEmoji',
}

export interface EmojiProps {
  messageContent: string
  setMessageContent: (value: string) => void
}
