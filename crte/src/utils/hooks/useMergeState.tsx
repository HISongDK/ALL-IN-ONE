import React, { useState } from 'react'

export const useMergeState = <T,>(initialState = {}) => {
  const [value, setValue] = useState<any>(initialState)

  const mergeState = (newState: any) => {
    if (typeof newState === 'function') newState = newState(value)
    setValue({ ...value, ...newState })
  }

  return [value, mergeState]
}

export default useMergeState
