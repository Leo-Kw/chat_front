import React from 'react'
import { FormContent, FormErrorTip, FormInput, FormItem } from './atoms'
import useForm from './use-form'

interface ItemType {
  label: string
  showLabel?: boolean
  type: string
  name: string
}

export interface FormProps {
  items: ItemType[]
}

export const Form = (props: React.PropsWithChildren<FormProps>) => {
  const { items, children } = props
  const {
    register,
    formState: { errors },
  } = useForm()

  console.log(errors)

  return (
    <FormContent>
      {items.map((item) => (
        <FormItem key={item.name}>
          {item.showLabel && <label>{item.label}</label>}
          <FormInput {...register(item.name, { required: true })} />
          {errors[item.name] && <FormErrorTip>{item.name}</FormErrorTip>}
        </FormItem>
      ))}
      {children}
    </FormContent>
  )
}
