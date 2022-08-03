import React from 'react'
import {
  FormOkButton,
  LoginWrapper,
  FormContent,
  FormInput,
  FormErrorTip,
  FormShowPassword,
  LoginTitle,
  ControlButtonWrapper,
  ControlButton,
} from './atoms'
import { useForm, Resolver } from 'react-hook-form'

type FormValues = {
  account: string
  password: string
}

const resolver: Resolver<FormValues> = async (values) => {
  const errors = {
    ...(!values.account
      ? {
          account: {
            type: 'required',
            message: '请输入账号！',
          },
        }
      : {}),
    ...(!values.password
      ? {
          password: {
            type: 'required',
            message: '请输入密码！',
          },
        }
      : {}),
  }
  return {
    values,
    errors,
  }
}

export const LoginView: React.FC = () => {
  // const [passwordStatus, setPasswordStatus] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver })
  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <LoginWrapper>
      <LoginTitle>航哥的聊天室</LoginTitle>
      <FormContent onSubmit={onSubmit}>
        <FormInput {...register('account')} placeholder='账号' />
        {errors?.account && <FormErrorTip>{errors.account.message}</FormErrorTip>}
        <FormInput
          {...register('password', { required: true, maxLength: 20 })}
          placeholder='密码'
          type={'password'}
        />
        {errors?.password && <FormErrorTip>{errors.password.message}</FormErrorTip>}
        <FormShowPassword />
        <ControlButtonWrapper>
          <ControlButton type='button'>忘记密码</ControlButton>
          <ControlButton type='button'>注册账号</ControlButton>
        </ControlButtonWrapper>
        <FormOkButton type='submit'>登录</FormOkButton>
      </FormContent>
    </LoginWrapper>
  )
}
