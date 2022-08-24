import React from 'react'
import { HeaderWrapper, HeaderTitle, HeaderControl, ChatButton } from './atoms'
import { chatControlBarConfig } from '@/constants'
import intl from 'react-intl-universal'
import { Icon, IconType } from '@/common/components/icon'
import { useNavigate } from 'react-router-dom'
import { AuthService } from '@/shared/services'
import { Toast } from '@/common/components'

export const ChatHeader = () => {
  const navigate = useNavigate()

  const share = () => {
    navigator.clipboard
      .writeText('航哥')
      .then(() => {
        Toast.success(intl.get('share_success'))
      })
      .catch(() => {
        Toast.error(intl.get('share_fail'))
      })
  }

  const barButton = (value: string) => {
    if (value === 'sign_out') {
      navigate('/login')
      AuthService.removeToken()
    }
  }

  return (
    <HeaderWrapper>
      <HeaderTitle>
        asd{' '}
        <div onClick={() => share()}>
          <ChatButton typeKey='title'>
            <Icon type='share' />
            {intl.get('share')}
          </ChatButton>
        </div>
      </HeaderTitle>
      <HeaderControl>
        {chatControlBarConfig.map((item) => (
          <div onClick={() => barButton(item.value)} key={item.key}>
            <ChatButton typeKey='title'>
              <Icon type={item.value as IconType} />
              {intl.get(item.value)}
            </ChatButton>
          </div>
        ))}
      </HeaderControl>
    </HeaderWrapper>
  )
}
