import { FieldValues, UseFormProps, useForm as useRhfForm } from 'react-hook-form'

export default function useForm<T extends FieldValues = FieldValues>(
  props?: UseFormProps<T, object>
) {
  const { ...formProps } = useRhfForm<T>(props)

  return {
    ...formProps,
  }
}
