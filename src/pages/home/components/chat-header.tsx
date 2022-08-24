import React from 'react'
import { HeaderWrapper, HeaderTitle, HeaderControl, ChatButton } from './atoms'
import { chatControlBarConfig } from '@/constants'
import intl from 'react-intl-universal'
import { Icon, IconType } from '@/common/components/icon'
import { useNavigate } from 'react-router-dom'
import { AuthService } from '@/shared/services'

export const ChatHeader = () => {
  const navigate = useNavigate()

  const barButton = (value: string) => {
    if (value === 'sign_out') {
      navigate('/login')
      AuthService.removeToken()
    }
  }

  return (
    <HeaderWrapper>
      <HeaderTitle>asd</HeaderTitle>
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
