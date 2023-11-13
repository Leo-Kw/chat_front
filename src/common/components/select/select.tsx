import { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react'

import { useClickAway } from '@/hook'
import { SelectInput, OptionWrap, SelectWrap, Option } from './atoms'
import { Transition } from 'react-transition-group'
import { DefaultOptionType, Props, RawValueType } from './types'

const duration = 300
const gap = 5

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 },
}

export const SelectComponent = <
  ValueType extends RawValueType = RawValueType,
  OptionType extends DefaultOptionType = DefaultOptionType,
>(
  { options, placeholder, value, handleChange, onChange, onBlur }: Props<ValueType, OptionType>,
  inputRef: ForwardedRef<HTMLInputElement>
) => {
  const selectRef = useRef<HTMLDivElement | null>(null)
  const optionRef = useRef<HTMLDivElement | null>(null)
  const [showOption, setShowOption] = useState(false)
  const [optionTop, setOptionTop] = useState(0)

  useClickAway(selectRef, () => {
    showOption && setShowOption(false)
  })

  useEffect(() => {
    if (selectRef.current && optionRef.current) {
      const { top, height } = selectRef.current.getBoundingClientRect()
      const calcHeight = top + height + optionRef.current.offsetHeight + gap
      setOptionTop(
        calcHeight > window.innerHeight ? optionRef.current.offsetHeight - gap : height + gap
      )
    }
  }, [selectRef, optionRef, showOption])

  return (
    <SelectWrap ref={selectRef} active={showOption}>
      <SelectInput ref={inputRef} onBlur={onBlur} onClick={() => setShowOption(true)}>
        {options.find((item) => item.value === value)?.label || placeholder}
      </SelectInput>
      <Transition in={showOption} timeout={duration} mountOnEnter unmountOnExit>
        {(state) => (
          <OptionWrap
            ref={optionRef}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
              top: optionTop,
            }}
          >
            {options.map((item) => (
              <Option
                key={item.value}
                active={item.value === value}
                onClick={() => {
                  handleChange?.(item.value as ValueType, item)
                  setShowOption(false)
                  onChange?.(item.value)
                }}
              >
                {item.label}
              </Option>
            ))}
          </OptionWrap>
        )}
      </Transition>
    </SelectWrap>
  )
}

export const Select = forwardRef(SelectComponent)
