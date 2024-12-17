import React from 'react'
import InfoIcon from './icons/info.svg?react'
import ErrorIcon from './icons/error.svg?react'
import WarnIcon from './icons/warn.svg?react'
import SuccessIcon from './icons/success.svg?react'
import LoadingIcon from './icons/loading.svg?react'
import RemoteIcon from './icons/remote.svg?react'
import RestartIcon from './icons/restart.svg?react'
import ResumeIcon from './icons/resume.svg?react'
import ShutdownIcon from './icons/shutdown.svg?react'
import StartIcon from './icons/start.svg?react'
import SuspendIcon from './icons/suspend.svg?react'
import ReleaseIcon from './icons/release.svg?react'
import CloseIcon from './icons/close.svg?react'
import EmojiIcon from './icons/emoji.svg?react'
import SongIcon from './icons/song.svg?react'
import ShowEye from './icons/show_eye.svg?react'
import HideEye from './icons/hide_eye.svg?react'
import ChatRecord from './icons/chat_record.svg?react'
import Myself from './icons/myself.svg?react'
import SignOut from './icons/sign_out.svg?react'
import Setting from './icons/setting.svg?react'
import Share from './icons/share.svg?react'
import File from './icons/file.svg?react'
import DefaultAvatar from './icons/default-avatar.svg?react'
import Lightning from './icons/lightning.svg?react'
import Microphone from './icons/microphone.svg?react'
import Video from './icons/video.svg?react'

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
  | 'lightning'
  | 'microphone'
  | 'video'

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
    case 'lightning':
      return <Lightning style={style} />
    case 'microphone':
      return <Microphone style={style} />
    case 'video':
      return <Video style={style} />
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
