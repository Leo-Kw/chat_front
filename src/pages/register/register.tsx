import React, { useState } from 'react'
import { useForm, Resolver } from 'react-hook-form'
import intl from 'react-intl-universal'

import { RegisterWrapper, ControlButtonWrapper, ControlButton } from './atoms'
import {
  ChickMusicImg,
  PasswordWrapper,
  FormOkButton,
  FormContent,
  FormInput,
  FormErrorTip,
  LoginTitle,
  FormItem,
  Toast,
} from '@/common/components'
import { NavLink } from '@/common/base-atoms'
import { RouteConfig } from '@/constants'
import { RegisterParams } from '@/shared/services/api/interface'
import { useAPI } from '@/hook'
import { Icon } from '@/common/components/icon'

const regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

const resolver: Resolver<RegisterParams> = async (values) => {
  const errors = {
    ...(!values.account
      ? {
          account: {
            type: 'required',
            message: intl.get('validate_account_required'),
          },
        }
      : {}),
    ...(!values.name
      ? {
          name: {
            type: 'required',
            message: intl.get('validate_name_required'),
          },
        }
      : {}),
    ...(!values.email
      ? {
          email: {
            type: 'required',
            message: intl.get('validate_email_required'),
          },
        }
      : !regex.test(values.email)
      ? {
          email: {
            type: 'required',
            message: intl.get('validate_email_format_required'),
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

export const RegisterView: React.FC = () => {
  const API = useAPI()
  const [isPassword, setIsPassword] = useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterParams>({ resolver, mode: 'onChange' })
  const onSubmit = handleSubmit((data) =>
    API.user.register(data).then((res) => {
      if (res.success) {
        Toast.success(intl.get('register_success'))
      }
    })
  )

  return (
    <RegisterWrapper>
      <ChickMusicImg />
      <LoginTitle>test</LoginTitle>
      <FormContent onSubmit={onSubmit}>
        <FormItem>
          <FormInput
            {...register('account', {
              required: 'error message', // JS only: <p>error message</p> TS only support string
            })}
            placeholder={intl.get('account')}
          />
          {errors?.account && <FormErrorTip>{errors.account.message}</FormErrorTip>}
        </FormItem>
        <FormItem>
          <FormInput {...register('name')} placeholder={intl.get('name')} />
          {errors?.name && <FormErrorTip>{errors.name.message}</FormErrorTip>}
        </FormItem>
        <FormItem>
          <FormInput {...register('email')} placeholder={intl.get('email')} />
          {errors?.email && <FormErrorTip>{errors.email.message}</FormErrorTip>}
        </FormItem>
        <FormItem>
          <PasswordWrapper>
            <FormInput
              type={isPassword ? 'password' : 'text'}
              {...register('password', { required: true, maxLength: 20 })}
              placeholder={intl.get('password')}
            />
            {isPassword ? (
              <div onClick={() => setIsPassword(!isPassword)}>
                <Icon type='show_eye' />
              </div>
            ) : (
              <div onClick={() => setIsPassword(!isPassword)}>
                <Icon type='hide_eye' />
              </div>
            )}
          </PasswordWrapper>
          {errors?.password && <FormErrorTip>{errors.password.message}</FormErrorTip>}
        </FormItem>
        <FormOkButton type='submit'>{intl.get('register_login')}</FormOkButton>
        <ControlButtonWrapper>
          <ControlButton>
            <NavLink to={'/' + RouteConfig.login}>{intl.get('have_account_to_login')}</NavLink>
          </ControlButton>
        </ControlButtonWrapper>
      </FormContent>
    </RegisterWrapper>
  )
}
