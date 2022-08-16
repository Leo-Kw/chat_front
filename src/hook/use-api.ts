import { useContext } from 'react'
import { APIContext } from '../context'
import { APIService } from '@/shared/services/api'

export const useAPI: () => APIService = () => {
  return useContext(APIContext)
}
