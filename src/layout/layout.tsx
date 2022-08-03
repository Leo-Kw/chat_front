import React from 'react'
import { BackgroundImage } from '../common/atoms'

interface props {
  children: React.ReactNode
}

export const Layout: React.FC<props> = ({ children }) => {
  return <BackgroundImage>{children}</BackgroundImage>
}
