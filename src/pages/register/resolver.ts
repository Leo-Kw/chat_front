import { intlCache } from '../../hook'
import { RegisterParams } from '../../shared/services/api/interface'
import { Resolver } from 'react-hook-form'

const regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

export const resolver: Resolver<RegisterParams> = async (values) => {
  const errors = {
    ...(!values.account
      ? {
          account: {
            type: 'required',
            message: intlCache.formatMessage({ id: 'validate_account_required' }),
          },
        }
      : {}),
    ...(!values.name
      ? {
          name: {
            type: 'required',
            message: intlCache.formatMessage({ id: 'validate_name_required' }),
          },
        }
      : {}),
    ...(!values.email
      ? {
          email: {
            type: 'required',
            message: intlCache.formatMessage({ id: 'validate_email_required' }),
          },
        }
      : !regex.test(values.email)
        ? {
            email: {
              type: 'required',
              message: intlCache.formatMessage({ id: 'validate_email_format_required' }),
            },
          }
        : {}),
    ...(!values.password
      ? {
          password: {
            type: 'required',
            message: intlCache.formatMessage({ id: 'validate_password_required' }),
          },
        }
      : {}),
  }
  return {
    values,
    errors,
  }
}
