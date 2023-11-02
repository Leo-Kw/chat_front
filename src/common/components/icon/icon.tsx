import React from 'react'
import { ReactComponent as InfoIcon } from './icons/info.svg'
import { ReactComponent as ErrorIcon } from './icons/error.svg'
import { ReactComponent as WarnIcon } from './icons/warn.svg'
import { ReactComponent as SuccessIcon } from './icons/success.svg'
import { ReactComponent as LoadingIcon } from './icons/loading.svg'
import { ReactComponent as RemoteIcon } from './icons/remote.svg'
import { ReactComponent as RestartIcon } from './icons/restart.svg'
import { ReactComponent as ResumeIcon } from './icons/resume.svg'
import { ReactComponent as ShutdownIcon } from './icons/shutdown.svg'
import { ReactComponent as StartIcon } from './icons/start.svg'
import { ReactComponent as SuspendIcon } from './icons/suspend.svg'
import { ReactComponent as ReleaseIcon } from './icons/release.svg'
import { ReactComponent as CloseIcon } from './icons/close.svg'
import { ReactComponent as EmojiIcon } from './icons/emoji.svg'
import { ReactComponent as SongIcon } from './icons/song.svg'
import { ReactComponent as ShowEye } from './icons/show_eye.svg'
import { ReactComponent as HideEye } from './icons/hide_eye.svg'
import { ReactComponent as ChatRecord } from './icons/chat_record.svg'
import { ReactComponent as Myself } from './icons/myself.svg'
import { ReactComponent as SignOut } from './icons/sign_out.svg'
import { ReactComponent as Setting } from './icons/setting.svg'
import { ReactComponent as Share } from './icons/share.svg'
import { ReactComponent as File } from './icons/file.svg'
import { ReactComponent as DefaultAvatar } from './icons/default-avatar.svg'

export type IconType =
  | 'info'
  | 'warn'
  | 'success'
  | 'error'
  | 'loading'
  | 'release'
  | 'resume'
  | 'remote'
  | 'restart'
  | 'shutdown'
  | 'start'
  | 'suspend'
  | 'close'
  | 'emoji'
  | 'song'
  | 'show_eye'
  | 'hide_eye'
  | 'chat_record'
  | 'myself'
  | 'sign_out'
  | 'setting'
  | 'share'
  | 'file'
  | 'default-avatar'

const iconMap = (type: IconType, style?: React.CSSProperties) => {
  switch (type) {
    case 'info':
      return <InfoIcon style={style} />
    case 'warn':
      return <WarnIcon style={style} />
    case 'error':
      return <ErrorIcon style={style} />
    case 'success':
      return <SuccessIcon style={style} />
    case 'loading':
      return <LoadingIcon style={style} />
    case 'release':
      return <ReleaseIcon style={style} />
    case 'resume':
      return <ResumeIcon style={style} />
    case 'remote':
      return <RemoteIcon style={style} />
    case 'restart':
      return <RestartIcon style={style} />
    case 'shutdown':
      return <ShutdownIcon style={style} />
    case 'start':
      return <StartIcon style={style} />
    case 'suspend':
      return <SuspendIcon style={style} />
    case 'close':
      return <CloseIcon style={style} />
    case 'emoji':
      return <EmojiIcon style={style} />
    case 'song':
      return <SongIcon style={style} />
    case 'show_eye':
      return <ShowEye style={style} />
    case 'hide_eye':
      return <HideEye style={style} />
    case 'chat_record':
      return <ChatRecord style={style} />
    case 'myself':
      return <Myself style={style} />
    case 'sign_out':
      return <SignOut style={style} />
    case 'setting':
      return <Setting style={style} />
    case 'share':
      return <Share style={style} />
    case 'file':
      return <File style={style} />
    case 'default-avatar':
      return <DefaultAvatar style={style} />
    default:
      return <></>
  }
}

export const Icon: React.FC<{ type: IconType; style?: React.CSSProperties }> = ({
  type,
  style,
}) => {
  return <>{iconMap(type, style)}</>
}
