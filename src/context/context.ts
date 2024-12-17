import { createContext } from 'react'
import { Context, State } from './global-state'
import { APIService } from '../shared/services/api'
import { io, Socket } from 'socket.io-client'

// global state
export const initValue: State = {
  userInfo: {
    id: 0,
    sex: 1,
    name: '',
    email: '',
    sign: '',
    role: '',
    room_id: '',
    avatar: '',
    account: '',
  },
  roomId: 1,
  messageList: [],
  unreadMessNum: 0,
}
export const StateContext = createContext<Context>({ state: initValue, dispatch: () => {} })

// api
export const APIContext = createContext<APIService>(new APIService())

// socket
const SOCKET_URL = `ws://${import.meta.env.VITE_SOCKET_URL}:3102`
export const socket = io(SOCKET_URL, { path: '/chat-socket' })
export const SocketContext = createContext<Socket>(socket)
