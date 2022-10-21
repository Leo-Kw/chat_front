import { createContext, Dispatch, ReactNode, useReducer } from 'react'
import { UserInfoType } from './types'

export enum ActionType {
  SetUserInfo = 'SetUserInfo',
}

interface Props {
  children: ReactNode
}

interface State {
  count: number
  userInfo: UserInfoType
}

interface Context {
  state: State
  dispatch: Dispatch<Action>
}

interface Action {
  type: ActionType.SetUserInfo
  payload: UserInfoType
}

const initValue: State = {
  count: 0,
  userInfo: {
    id: 0,
    sex: 0,
    name: '',
    email: '',
    sign: '',
    role: 0,
    room_id: '',
    avatar: '',
    account: '',
  },
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SetUserInfo:
      return { ...state, userInfo: action.payload }
    default:
      return state
  }
}

export const StateContext = createContext<Context>({ state: initValue, dispatch: () => {} })

export const GloablStateProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initValue)

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>
}
