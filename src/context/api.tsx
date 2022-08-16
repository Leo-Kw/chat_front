import React, { createContext } from 'react'
import { APIService } from '@/shared/services/api'

type Props = {
  client: APIService
  children: React.ReactNode
}

export const APIContext = createContext<APIService>(new APIService())

export const APIProvider = ({ children, client }: Props) => {
  return <APIContext.Provider value={client}>{children}</APIContext.Provider>
}
