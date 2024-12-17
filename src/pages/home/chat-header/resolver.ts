import { intlCache } from '../../../hook'
import { PersonalParams } from '../../../shared/services/api/interface'
import { Resolver } from 'react-hook-form'

export const personalResolver: Resolver<Pick<PersonalParams, 'name' | 'sex'>> = async (values) => {
  const errors = {
    ...(!values.name
      ? {
          name: {
            type: 'required',
            message: intlCache.formatMessage({ id: 'validate_name_required' }),
          },
        }
      : {}),
    ...(!values.sex
      ? {
          sex: {
            type: 'required',
            message: intlCache.formatMessage({ id: 'validate_sex_required' }),
          },
        }
      : {}),
  }
  return {
    values,
    errors,
  }
}
