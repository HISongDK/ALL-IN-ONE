import React, { useReducer } from 'react'

export function useAsync(fn: (params: any) => void) {
  const initialState = { loading: false, error: null, value: null }

  // eslint-disable-next-line consistent-return
  const stateReducer = (_: any, action: any) => {
    switch (action.type) {
      case 'start':
        return { loading: true, error: null, value: null }
      case 'finish':
        return { loading: false, error: null, value: action.value }
      case 'error':
        return { loading: false, error: action.error, value: null }
      default:
    }
  }

  const [state, dispatch] = useReducer(stateReducer, initialState)

  const run = async (args: any = null) => {
    try {
      dispatch({ type: 'start' })
      const value = await fn(args)
      dispatch({ type: 'finish', value })
    } catch (error) {
      dispatch({ type: 'error', error })
    }
  }

  return { ...state, run }
}

export default useAsync
