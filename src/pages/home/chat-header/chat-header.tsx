import { HeaderWrapper, HeaderPieceWrapper, HeaderTitle, ChatButton } from './atoms'
import { chatControlBarConfig } from '@/constants'
import { Icon, IconType } from '@/common/components/icon'
import { useNavigate } from 'react-router-dom'
import { AuthService } from '@/shared/services'
import { Toast } from '@/common/components'
import { useIntlLocale } from '@/hook'

export const ChatHeader = () => {
  const t = useIntlLocale()
  const navigate = useNavigate()

  const share = () => {
    navigator.clipboard
      .writeText('航哥真帅！')
      .then(() => {
        Toast.success(t('share_success'))
      })
      .catch(() => {
        Toast.error(t('share_fail'))
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
      <HeaderPieceWrapper>
        <HeaderTitle>🐷🐷房间</HeaderTitle>
        <div onClick={() => share()}>
          <ChatButton typeKey='title'>
            <Icon type='share' />
            {t('share')}
          </ChatButton>
        </div>
      </HeaderPieceWrapper>
      <HeaderPieceWrapper>
        {chatControlBarConfig.map((item) => (
          <div onClick={() => barButton(item.value)} key={item.key}>
            <ChatButton typeKey='title'>
              <Icon type={item.value as IconType} />
              {t(item.value)}
            </ChatButton>
          </div>
        ))}
      </HeaderPieceWrapper>
    </HeaderWrapper>
  )
}
