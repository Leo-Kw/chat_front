import { RecordResponse } from '@/shared/services/api/interface'

export interface SocketOnMessage {
  data: RecordResponse
  msg: string
}
