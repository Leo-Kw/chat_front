import { ControllerRenderProps } from 'react-hook-form'

export type RawValueType = string | number | null

export interface DefaultOptionType extends BaseOptionType {
  label: React.ReactNode
  value: RawValueType
  children?: Omit<DefaultOptionType, 'children'>[]
  [name: string]:
    | React.ReactNode
    | RawValueType
    | Omit<DefaultOptionType, 'children'>[]
    | string
    | number
}

export interface BaseOptionType {
  disabled?: boolean
  [name: string]:
    | React.ReactNode
    | RawValueType
    | Omit<DefaultOptionType, 'children'>[]
    | string
    | number
}

export type Props<ValueType, OptionType extends DefaultOptionType = DefaultOptionType> = Partial<
  Omit<ControllerRenderProps<{ [key in string]: string }>, 'value'>
> & {
  placeholder?: string
  options: OptionType[]
  value: ValueType
  handleChange?: (v: ValueType, option: OptionType) => void
}
