import React, { useState } from 'react'
import {
  FormOkButton,
  LoginWrapper,
  FormContent,
  FormInput,
  FormErrorTip,
  FormShowPassword,
} from './atoms'
import { useForm, Resolver } from 'react-hook-form'

type FormValues = {
  account: string
  password: string
}

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.account ? values : {},
    errors: !values.account
      ? {
          account: {
            type: 'required',
            message: '请输入账号！',
          },
        }
      : {},
  }
}

export const LoginView: React.FC = () => {
  const [passwordStatus, setPasswordStatus] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver })
  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <LoginWrapper>
      <FormContent onSubmit={onSubmit}>
        <FormInput {...register('account')} placeholder='账号' />
        {errors?.account && <FormErrorTip>{errors.account.message}</FormErrorTip>}
        <FormInput
          {...register('password')}
          placeholder='密码'
          type={passwordStatus ? 'text' : 'password'}
        />
        <FormShowPassword />
        <FormOkButton type='submit'>登录</FormOkButton>
      </FormContent>
    </LoginWrapper>
  )
}
