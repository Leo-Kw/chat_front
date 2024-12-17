import { RecordResponse } from '../shared/services/api/interface'
import { Dispatch, ReactNode, useReducer } from 'react'
import { ActionType, UserInfoType } from './types'
import { initValue, StateContext } from './context'

interface Props {
  children: ReactNode
}

export interface State {
  userInfo: UserInfoType
  messageList: RecordResponse[]
  roomId: number
  unreadMessNum: number
}

export interface Context {
  state: State
  dispatch: Dispatch<Action>
}

export type Action =
  | {
      type: ActionType.SetUserInfo
      payload: UserInfoType
    }
  | {
      type: ActionType.SetRoomId
      payload: number
    }
  | {
      type: ActionType.SetMessageList
      payload: RecordResponse[]
    }
  | {
      type: ActionType.AddNewMessage
      payload: RecordResponse
    }
  | {
      type: ActionType.AddOneUnreadMessNum
    }
  | {
      type: ActionType.ClearUnreadMessNum
    }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SetUserInfo:
      return { ...state, userInfo: action.payload }
    case ActionType.SetRoomId:
      return { ...state, roomId: action.payload }
    case ActionType.SetMessageList:
      return { ...state, messageList: [...action.payload, ...state.messageList] }
    case ActionType.AddNewMessage:
      return { ...state, messageList: [...state.messageList, action.payload] }
    case ActionType.AddOneUnreadMessNum:
      return { ...state, unreadMessNum: ++state.unreadMessNum }
    case ActionType.ClearUnreadMessNum:
      return { ...state, unreadMessNum: 0 }
    default:
      return state
  }
}

export const GlobalStateProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initValue)

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>
}
