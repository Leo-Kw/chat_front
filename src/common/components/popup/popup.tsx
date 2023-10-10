import { useEffect, useRef, useState } from 'react'
import { Transition } from 'react-transition-group'
import { PopupWrapper } from './atoms'
import { PopupProps } from './popup.type'
import { useClickAway } from '@/hook'

const duration = 300

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

export const Popup = ({
  width = 350,
  height = 400,
  left,
  bottom,
  children,
  content,
  open,
  onOpenChange,
}: PopupProps) => {
  const [isShowPopup, setIsShowPopup] = useState(false)
  const popupRef = useRef<HTMLDivElement | null>(null)

  useClickAway(popupRef, () => {
    if (isShowPopup) {
      setIsShowPopup(false)
      onOpenChange?.(false)
    }
  })

  useEffect(() => {
    if (typeof open === 'boolean') {
      if (open) {
        setIsShowPopup(true)
      } else {
        setIsShowPopup(false)
      }
    }
  }, [open])

  return (
    <div ref={popupRef} style={{ position: 'relative' }}>
      <Transition in={isShowPopup} timeout={duration} mountOnEnter unmountOnExit>
        {(state) => (
          <PopupWrapper
            width={width}
            height={height}
            left={left}
            bottom={bottom}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {content}
          </PopupWrapper>
        )}
      </Transition>
      <div
        onClick={() => {
          setIsShowPopup(true)
          onOpenChange?.(true)
        }}
      >
        {children}
      </div>
    </div>
  )
}
