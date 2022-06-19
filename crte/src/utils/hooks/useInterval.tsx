import React, { useRef, useEffect } from 'react'

export function useInterval(callback: any, delay = 500) {
  const savedCallback = useRef(() => {})

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      savedCallback.current()
    }

    const timer = setInterval(tick, delay)
    return () => clearInterval(timer)
  }, [delay])
}

export default useInterval
