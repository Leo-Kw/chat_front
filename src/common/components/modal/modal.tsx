import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Transition } from 'react-transition-group'
import {
  CloseIconWrap,
  Content,
  Footer,
  Header,
  Main,
  Mask,
  ModalButton,
  ModalStyle,
} from './atoms'
import { ModalProps } from './modal.type'
import { Icon } from '../icon'
import ModalManager from './modal-manager'
import { useIntlLocale } from '@/hook'

const ANIMATION_DELAY = 200
const modalManager = new ModalManager()

const MaskState = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 },
}

const WrapState = {
  entering: {
    transform: 'scale(0.4)',
    msTransform: 'scale(0.4)',
    WebkitTransform: 'scale(0.4)',
    opacity: 0,
  },
  entered: {
    transform: 'scale(1)',
    msTransform: 'scale(1)',
    WebkitTransform: 'scale(1)',
    opacity: 1,
  },
  exiting: {
    transform: 'scale(0.2)',
    msTransform: 'scale(0.2)',
    WebkitTransform: 'scale(0.2)',
    opacity: 0,
  },
  exited: {
    transform: 'scale(0.2)',
    msTransform: 'scale(0.2)',
    WebkitTransform: 'scale(0.2)',
    opacity: 0,
  },
  unmounted: {
    transform: 'scale(0.2)',
    msTransform: 'scale(0.2)',
    WebkitTransform: 'scale(0.2)',
    opacity: 0,
  },
}

export const Modal = (props: ModalProps) => {
  const t = useIntlLocale()
  const {
    children,
    visible,
    title,
    top,
    right,
    left,
    bottom,
    onCancel,
    onOk,
    destory,
    zIndex = 800,
    closable = true,
    maskClosable = true,
    canEnterClose = true,
    confirmLoading,
    hiddenCancelButton = false,
    okText = t('component_confirm'),
    cancelText = t('component_cancel'),
    footer,
    width,
    bodyStyle,
    okButtonProps,
    backgroundColor,
  } = props
  const [isShowModal, setIsShowModal] = useState(true)
  const nodeRef = React.useRef(null)
  const container = React.useRef<HTMLElement | null>(null)

  if (container.current === null) {
    container.current = document.createElement('div')
  }

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!modalManager.isTopModal(container.current!)) {
        return
      }
      if (event.key === 'Enter') {
        canEnterClose && !confirmLoading && onOk?.()
        return
      }
      if (event.key === 'Escape') {
        onCancel?.()
        return
      }
    },
    [onCancel, onOk, canEnterClose, confirmLoading]
  )

  const handleOpen = useCallback(() => {
    setTimeout(() => {
      setIsShowModal(true)
      modalManager.add(container.current!)
    }, 100)
  }, [])

  const handleClose = useCallback(() => {
    // 在关闭动画结束后再清除元素
    const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
      setIsShowModal(false)
      modalManager.remove(container.current!)
      destory?.()
      clearTimeout(timeout)
    }, ANIMATION_DELAY)
  }, [destory])

  useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', handleKeyDown)
      handleOpen()
    } else {
      document.removeEventListener('keydown', handleKeyDown)
      handleClose()
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleClose, handleKeyDown, handleOpen, visible])

  const handleMaskClick = () => {
    if (!maskClosable) return
    onCancel?.()
  }

  const modalElement = (
    <Transition appear in={visible} timeout={ANIMATION_DELAY} nodeRef={nodeRef}>
      {(state) => (
        <ModalStyle zIndex={zIndex!} visible={visible}>
          <Mask onClick={handleMaskClick} style={{ ...MaskState[state] }}></Mask>
          <Content
            style={{
              ...WrapState[state],
            }}
            top={top}
            right={right}
            left={left}
            bottom={bottom}
            minWidth={width}
            backgroundColor={backgroundColor}
          >
            <Header>
              {title}
              {closable && (
                <CloseIconWrap onClick={onCancel}>
                  <Icon type='close' />
                </CloseIconWrap>
              )}
            </Header>
            <Main style={bodyStyle}>{children}</Main>
            {footer !== undefined ? (
              footer
            ) : (
              <Footer>
                {!hiddenCancelButton && (
                  <ModalButton variant='outlined' onClick={() => onCancel?.()}>
                    {cancelText}
                  </ModalButton>
                )}
                <ModalButton
                  variant='contained'
                  onClick={() => {
                    onOk?.()
                  }}
                  {...okButtonProps}
                >
                  {okText}
                </ModalButton>
              </Footer>
            )}
          </Content>
        </ModalStyle>
      )}
    </Transition>
  )
  return isShowModal ? ReactDOM.createPortal(modalElement, document.getElementById('root')!) : null
}
