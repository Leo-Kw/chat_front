import { FormErrorTip, FormInput, FormOkButton, Icon, Select, Toast } from '@/common/components'
import { Controller, useForm } from 'react-hook-form'
import { personalResolver } from '../resolver'
import { PersonalParams, SexType } from '@/shared/services'
import { useAPI, useGlobalState, useIntlLocale } from '@/hook'
import { ChangeEvent, useRef, useState } from 'react'
import { ActionType } from '@/context'

// const pickerOpts: OpenFilePickerOptions = {
//   types: [
//     {
//       description: 'code',
//       accept: {
//         'image/*': ['.png', '.jpeg', '.jpg'],
//       },
//     },
//   ],
//   excludeAcceptAllOption: true,
//   multiple: false,
// }

const sexOptions = [
  { label: '未知', value: SexType.Unknown },
  { label: '男', value: SexType.Male },
  { label: '女', value: SexType.Female },
]

export const MyselfPopup = ({ onClose }: { onClose: () => void }) => {
  const API = useAPI()
  const t = useIntlLocale()
  const { state, dispatch } = useGlobalState()
  const { userInfo } = state
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Pick<PersonalParams, 'name' | 'sex'>>({
    resolver: personalResolver,
    mode: 'onChange',
    defaultValues: {
      name: userInfo.name,
      sex: userInfo.sex,
    },
  })
  const [sexValue, setSexValue] = useState(userInfo.sex)
  const [imgLoadSuccess, setImgLoadSuccess] = useState(true)
  const uploadRef = useRef<HTMLInputElement>(null)

  const onSubmit = handleSubmit((data) => {
    API.user.updateUserInfo({ ...data, id: userInfo.id }).then((res) => {
      if (res.result) {
        Toast.success(t('modify_success'))
        updateUserInfo()
        onClose()
      }
    })
  })

  // const uploadAvatar = async () => {
  //   try {
  //     const [fileHandle] = await showOpenFilePicker(pickerOpts)
  //     const file = await fileHandle.getFile()

  //   } catch (e) {
  //     // Handling of user rejection
  //   }
  // }

  const uploadAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 1048576) {
        Toast.error(t('avatar_size_limit'))
        return
      }
      const formdata = new FormData()
      formdata.append('file', file)
      formdata.append('userId', String(userInfo.id))
      API.user.uploadAvatar(formdata).then((res) => {
        if (res.result) {
          Toast.success(t('upload_success'))
          updateUserInfo()
        }
      })
    }
  }

  const updateUserInfo = () => {
    API.user.getUserInfo().then((res) => {
      if (res.result) {
        dispatch({ type: ActionType.SetUserInfo, payload: res.data })
      }
    })
  }

  return (
    <>
      <div
        className='group relative m-auto mb-[20px] flex h-[100px] w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-[5px] bg-gray-200 [&>img]:h-[100px] [&>img]:w-[100px] [&>img]:object-contain'
        onClick={() => uploadRef.current && uploadRef.current.click()}
      >
        {userInfo.avatar && imgLoadSuccess ? (
          <img
            src={userInfo.avatar}
            alt='avatar'
            onLoad={() => setImgLoadSuccess(true)}
            onError={() => setImgLoadSuccess(false)}
          />
        ) : (
          <Icon type='default-avatar' style={{ width: '70px', height: '70px' }} />
        )}
        <div className='absolute bottom-0 left-0 hidden h-full w-full select-none bg-gradient-to-b from-transparent from-55% to-[#0000007f] to-100% text-[12px] font-bold text-white group-hover:block'>
          <span className='absolute bottom-[6px] left-[26px]'>修改头像</span>
        </div>
        <input ref={uploadRef} type='file' className='hidden' onChange={uploadAvatar} />
      </div>
      <form className='mt-3 flex flex-col justify-center' onSubmit={onSubmit}>
        <div className='mb-4 flex items-center'>
          <div className='w-11 text-form-label'>{t('name')}</div>
          <div className='w-full'>
            <FormInput {...register('name')} placeholder={t('name')} />
            {errors?.name && <FormErrorTip>{errors.name.message}</FormErrorTip>}
          </div>
        </div>
        <div className='mb-4 flex items-center'>
          <div className='w-11 text-form-label'>{t('sex')}</div>
          <div className='w-full'>
            <Controller
              name='sex'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  value={sexValue}
                  options={sexOptions}
                  handleChange={(value) => setSexValue(value)}
                />
              )}
            />
            {errors?.sex && <FormErrorTip>{errors.sex.message}</FormErrorTip>}
          </div>
        </div>
        <FormOkButton type='submit'>{t('confirm')}</FormOkButton>
      </form>
    </>
  )
}
