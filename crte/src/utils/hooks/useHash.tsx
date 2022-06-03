import React, { useState, useEffect, useCallback } from 'react'

function useHash() {
  const [hash, setHash] = useState(() => window.location.hash)

  const hashHandler = useCallback(() => {
    setHash(window.location.hash)
  }, [])

  useEffect(() => {
    window.addEventListener('hashchange', hashHandler)
    return () => {
      window.removeEventListener('hashchange', hashHandler)
    }
  }, [])

  const updateHash = useCallback(
    (newHash) => {
      if (newHash !== hash) window.location.hash = newHash
    },
    [hash],
  )

  return [hash, updateHash]
}

export default useHash
