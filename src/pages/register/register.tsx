import React, { useState } from 'react'
import { useForm, Resolver } from 'react-hook-form'

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
import { RouteConfig } from '@/route'
import { RegisterParams } from '@/shared/services/api/interface'
import { useAPI } from '@/hook'
import { Icon } from '@/common/components/icon'
import { useIntlLocale, intlCache } from '@/hook'

const regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

const resolver: Resolver<RegisterParams> = async (values) => {
  const errors = {
    ...(!values.account
      ? {
          account: {
            type: 'required',
            message: intlCache.formatMessage({ id: 'validate_account_required' }),
          },
        }
      : {}),
    ...(!values.name
      ? {
          name: {
            type: 'required',
            message: intlCache.formatMessage({ id: 'validate_name_required' }),
          },
        }
      : {}),
    ...(!values.email
      ? {
          email: {
            type: 'required',
            message: intlCache.formatMessage({ id: 'validate_email_required' }),
          },
        }
      : !regex.test(values.email)
      ? {
          email: {
            type: 'required',
            message: intlCache.formatMessage({ id: 'validate_email_format_required' }),
          },
        }
      : {}),
    ...(!values.password
      ? {
          password: {
            type: 'required',
            message: intlCache.formatMessage({ id: 'validate_password_required' }),
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
  const t = useIntlLocale()
  const [isPassword, setIsPassword] = useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterParams>({ resolver, mode: 'onChange' })
  const onSubmit = handleSubmit((data) =>
    API.user.register(data).then((res) => {
      if (res.success) {
        Toast.success(t('register_success'))
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
            placeholder={t('account')}
          />
          {errors?.account && <FormErrorTip>{errors.account.message}</FormErrorTip>}
        </FormItem>
        <FormItem>
          <FormInput {...register('name')} placeholder={t('name')} />
          {errors?.name && <FormErrorTip>{errors.name.message}</FormErrorTip>}
        </FormItem>
        <FormItem>
          <FormInput {...register('email')} placeholder={t('email')} />
          {errors?.email && <FormErrorTip>{errors.email.message}</FormErrorTip>}
        </FormItem>
        <FormItem>
          <PasswordWrapper>
            <FormInput
              type={isPassword ? 'password' : 'text'}
              {...register('password', { required: true, maxLength: 20 })}
              placeholder={t('password')}
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
        <FormOkButton type='submit'>{t('register_login')}</FormOkButton>
        <ControlButtonWrapper>
          <ControlButton>
            <NavLink to={RouteConfig.login}>{t('have_account_to_login')}</NavLink>
          </ControlButton>
        </ControlButtonWrapper>
      </FormContent>
    </RegisterWrapper>
  )
}
