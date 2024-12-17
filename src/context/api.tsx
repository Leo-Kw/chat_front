import { ReactNode } from 'react'
import { APIService } from '../shared/services/api'
import { APIContext } from './context'

type Props = {
  client: APIService
  children: ReactNode
}

export const APIProvider = ({ children, client }: Props) => {
  return <APIContext.Provider value={client}>{children}</APIContext.Provider>
}
