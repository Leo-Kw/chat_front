import { RefObject, useEffect, useRef } from 'react'
import { off, on } from '../utils'

const defaultEvents = ['mousedown', 'touchstart']

export const useClickAway = <E extends Event = Event>(
  ref: RefObject<HTMLElement | null>,
  onClickAway: (event: E | Event) => void,
  events: string[] = defaultEvents
) => {
  const savedCallback = useRef(onClickAway)

  useEffect(() => {
    savedCallback.current = onClickAway
  }, [onClickAway])

  useEffect(() => {
    const handler = (event: Event) => {
      const { current: el } = ref
      if (el && !el.contains(event.target as Node)) savedCallback.current(event)
    }
    for (const eventName of events) {
      on(document, eventName, handler)
    }
    return () => {
      for (const eventName of events) {
        off(document, eventName, handler)
      }
    }
  }, [events, ref])
}
