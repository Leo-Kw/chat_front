import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { RegisterWrapper, ControlButtonWrapper, ControlButton } from './atoms'
import {
  PasswordWrapper,
  FormOkButton,
  FormContent,
  FormInput,
  FormErrorTip,
  LoginTitle,
  FormItem,
  Toast,
  Lottie,
} from '@/common/components'
import { NavLink } from '@/common/base-atoms'
import { RouteConfig } from '@/route'
import { RegisterParams } from '@/shared/services/api/interface'
import { useAPI } from '@/hook'
import { Icon } from '@/common/components/icon'
import { useIntlLocale } from '@/hook'
import musicAnimationData from '@/common/json/lottie/happy-spaceman.json'
import { resolver } from './resolver'

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
      if (res.result) {
        Toast.success(t('register_success'))
      }
    })
  )

  return (
    <RegisterWrapper>
      <Lottie animationData={musicAnimationData} />
      <LoginTitle>{t('sign_up')}</LoginTitle>
      <FormContent onSubmit={onSubmit}>
        <FormItem>
          <FormInput {...register('account')} placeholder={t('account')} />
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
