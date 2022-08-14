import React, { useState } from 'react'
import { useForm, Resolver } from 'react-hook-form'
import intl from 'react-intl-universal'

import { Toast } from '@/common/components'
import { ControlButtonWrapper, ControlButton, LoginWrapper } from './atoms'
import {
  ChickMusicImg,
  ShowEyeIcon,
  HideEyeIcon,
  PasswordWrapper,
  FormOkButton,
  FormContent,
  FormInput,
  FormErrorTip,
  LoginTitle,
  FormItem,
} from '@/common/components'
import { RouteConfig } from '@/constants'
import { NavLink } from '@/common/base-atoms'
import { LoginApi } from './login.api'
import { LoginType } from './login.type'

const resolver: Resolver<LoginType.LoginParams> = async (values) => {
  const errors = {
    ...(!values.account
      ? {
          account: {
            type: 'required',
            message: intl.get('validate_account_required'),
          },
        }
      : {}),
    ...(!values.password
      ? {
          password: {
            type: 'required',
            message: intl.get('validate_password_required'),
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
  const [isPassword, setIsPassword] = useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType.LoginParams>({ resolver })
  const onSubmit = handleSubmit((data) => {
    LoginApi.login(data).then((res) => {
      if (res.success) {
        Toast.success(intl.get('login_success'))
      }
    })
  })

  return (
    <LoginWrapper>
      <ChickMusicImg />
      <LoginTitle>test</LoginTitle>
      <FormContent onSubmit={onSubmit}>
        <FormItem>
          <FormInput {...register('account')} placeholder={intl.get('account')} />
          {errors?.account && <FormErrorTip>{errors.account.message}</FormErrorTip>}
        </FormItem>
        <FormItem>
          <PasswordWrapper>
            <FormInput
              type={isPassword ? 'password' : 'text'}
              {...register('password', { required: true, maxLength: 20 })}
              placeholder={intl.get('password')}
            />
            {isPassword ? (
              <ShowEyeIcon onClick={() => setIsPassword(!isPassword)} />
            ) : (
              <HideEyeIcon onClick={() => setIsPassword(!isPassword)} />
            )}
          </PasswordWrapper>
          {errors?.password && <FormErrorTip>{errors.password.message}</FormErrorTip>}
        </FormItem>
        <ControlButtonWrapper>
          <ControlButton type='button'>{intl.get('forget_password')}</ControlButton>
          <ControlButton type='button'>
            <NavLink to={'/' + RouteConfig.register}>{intl.get('sign_up')}</NavLink>
          </ControlButton>
        </ControlButtonWrapper>
        <FormOkButton type='submit'>{intl.get('login')}</FormOkButton>
      </FormContent>
    </LoginWrapper>
  )
}
