import { RecordResponse } from '@/shared/services/api/interface'
import { createContext, Dispatch, ReactNode, useReducer } from 'react'
import { UserInfoType } from './types'

export enum ActionType {
  SetUserInfo = 'SetUserInfo',
  SetRoomId = 'SetRoomId',
  SetMessageList = 'SetMessageList',
  AddNewMessage = 'AddNewMessage',
  AddOneUnreadMessNum = 'AddOneUnreadMessNum',
  ClearUnreadMessNum = 'ClearUnreadMessNum',
}

interface Props {
  children: ReactNode
}

interface State {
  userInfo: UserInfoType
  messageList: RecordResponse[]
  roomId: number
  unreadMessNum: number
}

interface Context {
  state: State
  dispatch: Dispatch<Action>
}

type Action =
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

const initValue: State = {
  userInfo: {
    id: 0,
    sex: 0,
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

export const StateContext = createContext<Context>({ state: initValue, dispatch: () => {} })

export const GloablStateProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initValue)

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>
}
