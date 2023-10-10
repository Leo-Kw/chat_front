import { FC, PropsWithChildren, ReactNode, createContext } from 'react'

export type Props = PropsWithChildren<{
  status?: boolean
  override?: boolean
}>

// const FormContext = createContext()

// export const FormProvider = ({ children }: Props) => {
//   const [state, dispatch] = useReducer(reducer, initValue)

//   return <FormContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>
// }
