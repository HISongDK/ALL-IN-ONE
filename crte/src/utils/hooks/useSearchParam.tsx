import React, { useCallback, useState, useEffect } from 'react'

function useSearchParam(param: string) {
  const getValue = useCallback(
    () => new URLSearchParams(window.location.search).get(param),
    [param],
  )
  const [value, setValue] = useState(getValue)

  useEffect(() => {
    const onChange = () => {
      setValue(getValue())
    }

    window.addEventListener('popstate', onChange)
    // 监听需要覆写 history 上对应的方法，手动触发事件
    window.addEventListener('pushState', onChange)
    window.addEventListener('replaceState', onChange)
    return () => {
      window.removeEventListener('popstate', onChange)
      window.removeEventListener('pushState', onChange)
      window.removeEventListener('replaceState', onChange)
    }
  }, [])

  return value
}

export default useSearchParam
