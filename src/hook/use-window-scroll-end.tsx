import { useEffect, useRef } from 'react'

export const useWindowScrollEnd = (callback: () => void, delay = 200) => {
  const timeoutIdRef = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }

      timeoutIdRef.current = window.setTimeout(() => {
        callback()
      }, delay)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [callback, delay])
}
