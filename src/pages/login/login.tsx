import React, { useState } from 'react'
import { useForm, Resolver } from 'react-hook-form'

import {
  PasswordWrapper,
  FormOkButton,
  FormContent,
  FormInput,
  FormErrorTip,
  LoginTitle,
  FormItem,
  Lottie,
  Toast,
} from '../../common/components'
import { RouteConfig } from '../../route'
import { NavLink } from '../../common/base-atoms'
import { AuthService } from '../../shared/services'
import { useAPI, useGlobalState } from '../../hook'
import { LoginParams } from '../../shared/services/api/interface'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../common/components/icon'
import { useIntlLocale, intlCache } from '../../hook'
import { ActionType } from '../../context'
import musicAnimationData from '../../common/json/lottie/happy-spaceman.json'

const resolver: Resolver<LoginParams> = async (values) => {
  const errors = {
    ...(!values.account
      ? {
          account: {
            type: 'required',
            message: intlCache.formatMessage({ id: 'validate_account_required' }),
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

export const LoginView: React.FC = () => {
  const API = useAPI()
  const t = useIntlLocale()
  const navigate = useNavigate()
  const { dispatch } = useGlobalState()
  const [isPassword, setIsPassword] = useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginParams>({ resolver })
  const onSubmit = handleSubmit((data) => {
    API.user.login(data).then((res) => {
      if (res.result) {
        Toast.success(t('login_success'))
        AuthService.setToken(res.data.token)
        dispatch({ type: ActionType.SetUserInfo, payload: res.data.userInfo })
        navigate('/')
      }
    })
  })

  return (
    <div className='flex flex-col items-center'>
      <Lottie animationData={musicAnimationData} />
      <LoginTitle>{t('login')}</LoginTitle>
      <FormContent onSubmit={onSubmit}>
        <FormItem>
          <FormInput {...register('account')} placeholder={t('account')} />
          {errors?.account && <FormErrorTip>{errors.account.message}</FormErrorTip>}
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
        <div className='mb-5 flex justify-between [&>button]:bg-transparent [&>button]:text-base [&>button]:text-text-lighter'>
          <button type='button'>{t('forget_password')}</button>
          <button type='button'>
            <NavLink to={RouteConfig.register}>{t('sign_up')}</NavLink>
          </button>
        </div>
        <FormOkButton type='submit'>{t('login')}</FormOkButton>
      </FormContent>
    </div>
  )
}
