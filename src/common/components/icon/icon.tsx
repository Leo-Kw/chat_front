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
import { ReactComponent as SignOout } from './icons/sign_out.svg'
import { ReactComponent as Setting } from './icons/setting.svg'
import { ReactComponent as Share } from './icons/share.svg'
import { ReactComponent as File } from './icons/file.svg'

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

const IconMap = new Map<IconType, React.ReactElement>([
  ['info', <InfoIcon key='info' />],
  ['warn', <WarnIcon key='warn' />],
  ['error', <ErrorIcon key='warn' />],
  ['success', <SuccessIcon key='success' />],
  ['loading', <LoadingIcon key='loading' />],
  ['release', <ReleaseIcon key='release' />],
  ['resume', <ResumeIcon key='resume' />],
  ['remote', <RemoteIcon key='remote' />],
  ['restart', <RestartIcon key='restart' />],
  ['shutdown', <ShutdownIcon key='shutdown' />],
  ['start', <StartIcon key='start' />],
  ['suspend', <SuspendIcon key='suspend' />],
  ['close', <CloseIcon key='close' />],
  ['emoji', <EmojiIcon key='emoji' />],
  ['song', <SongIcon key='song' />],
  ['show_eye', <ShowEye key='show_eye' />],
  ['hide_eye', <HideEye key='hide_eye' />],
  ['chat_record', <ChatRecord key='chat_record' />],
  ['myself', <Myself key='myself' />],
  ['sign_out', <SignOout key='sign_out' />],
  ['setting', <Setting key='setting' />],
  ['share', <Share key='share' />],
  ['file', <File key='file' />],
])

export const Icon: React.FC<{ type: IconType }> = ({ type }) => {
  return <>{IconMap.get(type)}</>
}
