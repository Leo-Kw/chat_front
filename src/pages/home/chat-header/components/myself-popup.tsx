import { FormErrorTip, FormInput, FormOkButton, Select, Toast } from '@/common/components'
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
  const uploadRef = useRef<HTMLInputElement>(null)

  const onSubmit = handleSubmit((data) => {
    API.user.updateUserInfo({ ...data, id: userInfo.id }).then((res) => {
      if (res.result) {
        Toast.success(t('modity_success'))
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
    const file = e.target.files?.[0] as File
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
        className='w-[100px] h-[100px] m-auto bg-dark-50 rounded-[5px] cursor-pointer overflow-hidden  [&>img]:w-[100px] [&>img]:h-[100px] [&>img]:object-contain'
        onClick={() => uploadRef.current && uploadRef.current.click()}
      >
        {userInfo.avatar && <img src={userInfo.avatar} alt='avatar' />}
        <input ref={uploadRef} type='file' className='hidden' onChange={uploadAvatar} />
      </div>
      <form className='flex justify-center flex-col mt-3' onSubmit={onSubmit}>
        <div className='flex items-center mb-6'>
          <div className='w-11 text-form-label'>{t('name')}</div>
          <div className='w-full'>
            <FormInput {...register('name')} placeholder={t('name')} />
            {errors?.name && <FormErrorTip>{errors.name.message}</FormErrorTip>}
          </div>
        </div>
        <div className='flex items-center mb-6'>
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
