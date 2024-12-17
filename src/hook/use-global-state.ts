import { useContext } from 'react'
import { StateContext } from '../context'

export const useGlobalState = () => {
  return useContext(StateContext)
}
