import React, { useState } from 'react'

export const useLocalStorage = (key: string, defaultValue?: any) => {
  const [storeValue, setStoreValue] = useState(() => {
    try {
      const value = localStorage.getItem(key)
      if (value) {
        return JSON.parse(value)
      }
      localStorage.setItem(key, JSON.stringify(defaultValue))
      return defaultValue
    } catch (err) {
      return defaultValue
    }
  })

  const setValue = (newValue: any) => {
    localStorage.setItem(key, JSON.stringify(newValue))
    setStoreValue(newValue)
  }

  return [storeValue, setValue]
}

export default useLocalStorage
