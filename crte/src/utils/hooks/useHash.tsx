import React, { useState, useEffect, useCallback } from 'react'

type ReturnProps = [string, (newHash: string) => void]

export function useHash(): ReturnProps {
  const [hash, setHash] = useState(() => window.location.hash)

  const hashHandler = useCallback(() => {
    console.log(
      '---  window.location.hash 怎么没有触发  ---\n',
      window.location.hash,
    )
    setHash(window.location.hash)
  }, [])

  useEffect(() => {
    window.addEventListener('hashchange', hashHandler)
    return () => {
      window.removeEventListener('hashchange', hashHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateHash = useCallback(
    (newHash: string) => {
      if (newHash !== hash) window.location.hash = newHash
    },
    [hash],
  )

  return [hash, updateHash]
}

export default useHash
