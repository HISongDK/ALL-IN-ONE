import { useCallback, useState, useReducer } from 'react'

const useUpdate = () => {
  const [, setState] = useState({})

  return useCallback(() => setState({}), [])
}

export default useUpdate

export const useReducerUpdate = () => {
  const [, update] = useReducer(() => ({}), {})
  return update
}

/**
 * 有点疑问是这两种都是只更新状态重渲染啊
 * 不需要返回一个状态值添加到useEffect监听项数组中触发副作用么
 * 感觉后者更常见啊
 */
