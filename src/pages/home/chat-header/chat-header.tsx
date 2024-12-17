import { useState } from 'react'
import { Icon } from '../../../common/components/icon'
import { useNavigate } from 'react-router-dom'
import { AuthService } from '../../../shared/services'
import { Button, Popup, Toast } from '../../../common/components'
import { useIntlLocale } from '../../../hook'
import { MyselfPopup } from './components/myself-popup'

export const ChatHeader = () => {
  const t = useIntlLocale()
  const navigate = useNavigate()
  const [myselfOpen, setMyselfOpen] = useState(false)

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

  const onClose = () => {
    setMyselfOpen(false)
  }

  const logout = () => {
    navigate('/login')
    AuthService.removeToken()
  }

  return (
    <div className='flex h-[50px] items-center justify-between border-b-[1px] border-solid border-gray-border px-[20px]'>
      <div className='flex items-center'>
        <div className='rounded-[5px] bg-white px-[10px] py-[3px] shadow-[0_0_5px_#f2f2f2]'>
          🐷🐷房间
        </div>
        <div onClick={() => share()}>
          <Button type='text' color='#e5e5e5'>
            <Icon type='share' style={{ fill: '#e5e5e5' }} />
            <span className='max-md:hidden'>{t('share')}</span>
          </Button>
        </div>
      </div>
      <div className='flex items-center'>
        <Popup
          left={-185}
          bottom={-318}
          height={300}
          padding={15}
          title={t('myself')}
          content={<MyselfPopup onClose={onClose} />}
          open={myselfOpen}
          onOpenChange={(open) => setMyselfOpen(open)}
        >
          <Button type='text' color='#e5e5e5'>
            <Icon type='myself' style={{ fill: '#e5e5e5' }} />
            <span className='max-md:hidden'>{t('myself')}</span>
          </Button>
        </Popup>
        <Button type='text' color='#e5e5e5' onClick={() => logout()}>
          <Icon type='sign_out' style={{ fill: '#e5e5e5' }} />
          <span className='max-md:hidden'>{t('sign_out')}</span>
        </Button>
      </div>
    </div>
  )
}
