import { createContext, ReactNode } from 'react'
import { io, Socket } from 'socket.io-client'

type Props = {
  children: ReactNode
}

const SOCKET_URL = 'ws://localhost:3102'

const socket = io(SOCKET_URL, { path: '/chat' })

export const SocketContext = createContext<Socket>(socket)

export const SocketProvider = ({ children }: Props) => {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}
