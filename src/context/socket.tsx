import { ReactNode } from 'react'
import { socket, SocketContext } from './context'

type Props = {
  children: ReactNode
}

export const SocketProvider = ({ children }: Props) => {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}
