import { AttributifyAttributes } from 'windicss/types/jsx'
import React = require('react')

declare module 'react' {
  interface HTMLAttributes<T> extends AttributifyAttributes {}
}
