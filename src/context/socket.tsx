import { createContext, ReactNode } from 'react'
import { io, Socket } from 'socket.io-client'

type Props = {
  children: ReactNode
}

const SOCKET_URL = `ws://${import.meta.env.VITE_SOCKET_URL}:3102`

const socket = io(SOCKET_URL, { path: '/chat-socket' })

export const SocketContext = createContext<Socket>(socket)

export const SocketProvider = ({ children }: Props) => {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}
