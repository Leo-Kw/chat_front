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

type IconType =
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

const IconMap = new Map([
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
])

export const Icon: React.FC<{ type: IconType }> = ({ type }) => {
  return <>{IconMap.get(type)}</>
}
