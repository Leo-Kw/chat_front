import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Transition } from 'react-transition-group'
import { PopupWrapper } from './atoms'
import { PopupProps } from './popup.type'

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
}: PopupProps) => {
  const [isShowPopup, setIsShowPopup] = useState(false)
  const popupRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    document.addEventListener('click', hide)
    return () => {
      document.removeEventListener('click', hide)
    }
  }, [isShowPopup])

  const getInjectChildren = useCallback(() => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement, {
        onClick: (e: Event) => {
          setIsShowPopup(true)
          e.stopPropagation()
        },
      })
    }
    return children
  }, [children])

  const hide = useCallback(() => {
    isShowPopup && setIsShowPopup(false)
  }, [isShowPopup])

  return (
    <>
      <Transition nodeRef={popupRef} in={isShowPopup} timeout={duration} mountOnEnter unmountOnExit>
        {(state) => (
          <PopupWrapper
            ref={popupRef}
            width={width}
            height={height}
            left={left}
            bottom={bottom}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </PopupWrapper>
        )}
      </Transition>
      {getInjectChildren()}
    </>
  )
}
