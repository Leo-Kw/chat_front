import { useRef, useEffect, useMemo, forwardRef, useImperativeHandle, Ref } from 'react'
import lottie, { AnimationItem } from 'lottie-web'

type rendererType = 'svg' | 'canvas' | 'html'

// 常用属性
interface IProps {
  // whether to circulate
  loop?: boolean
  // render type
  renderer?: rendererType
  // whether to autoplay
  autoplay?: boolean
  // animationData
  animationData?: object
  // JSON path
  path?: string
}

interface RefProps {
  getInstance: () => void
  play: () => void
  pause: () => void
  stop: () => void
}

const Lottie = forwardRef((props: IProps, ref: Ref<RefProps>) => {
  const { loop = true, renderer = 'svg', path = '', animationData, autoplay = true } = props

  // rendering container
  const containerRef = useRef(null)
  // expose ref object
  const lottieAnimation = useRef<AnimationItem | null>(null)

  useImperativeHandle(ref, () => ({
    getInstance: () => lottieAnimation.current,
    // play animation
    play: () => lottieAnimation.current?.play(),
    // pause animation
    pause: () => lottieAnimation.current?.pause(),
    // stop animation
    stop: () => lottieAnimation.current?.stop(),
  }))

  const animationOptions = useMemo(() => {
    const option: IProps = {
      loop,
      renderer,
      autoplay,
    }

    if (animationData) {
      option.animationData = animationData
    } else {
      option.path = path
    }

    return option
  }, [loop, renderer, path, animationData, autoplay])

  useEffect(() => {
    if (!containerRef.current) return

    // rendering animation
    const lottieAnimationItem: AnimationItem = lottie.loadAnimation({
      container: containerRef.current,
      ...animationOptions,
    })

    lottieAnimation.current = lottieAnimationItem

    return () => {
      lottieAnimation.current = null
      lottieAnimationItem.destroy()
    }
  }, [animationOptions])

  return <div ref={containerRef} className='w-150px h-150px'></div>
})

Lottie.displayName = 'Lottie'

export { Lottie }
