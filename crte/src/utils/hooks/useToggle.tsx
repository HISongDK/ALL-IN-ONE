/**
 * Provides a boolean state variable that can be toggled between its two states.
 * 1. Use the useState() hook to create the value state variable and its setter
 * 2. Create a function that toggles the value of the value state variable and memoize it, using the useCallback() hook
 * 3. Return the value state variable and the memoized toggler function.
 */

import React, { useState, useCallback, useReducer } from 'react'

function useToggle(initialValue: boolean) {
  const [value, setValue] = useState(initialValue)
  const toggleValue = useCallback(() => setValue((prev) => !prev), [])
  return [value, toggleValue]
}

export function useReducerToggle(initialValue: boolean) {
  const [value, dispatchToggle] = useReducer((prev) => !prev, initialValue)
  return [value, dispatchToggle]
}

export default useToggle
