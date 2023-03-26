import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import procrastinationsList from '../config'
import storage from '@/utils/storage'
import { looseObj } from '@/constant'

const key = 'PROCRASTINATIONS_LIST'

function useStorageProcrastinations() {
  const date = dayjs().format('YYYYMMDD')
  const deepCloneDate = JSON.parse(JSON.stringify(procrastinationsList))
  const defaultData = {
    date,
    data: deepCloneDate,
  }

  const [procrastinations, setProcrastinations] = useState(defaultData)

  const setStorageState = (
    data: looseObj[] | ((data: looseObj[]) => looseObj[]),
  ) => {
    const isFunction =
      Object.prototype.toString.call(data) === '[object Function]'

    setProcrastinations((prev) => {
      let curData = prev

      if (isFunction) {
        curData = data(prev?.data)
      } else {
        curData = data
      }

      curData = { ...prev, data: curData }

      storage.set(key, curData)
      return curData
    })
  }

  const reset = () => {
    setStorageState(deepCloneDate)
  }

  useEffect(() => {
    const data = storage.get(key)

    if (!data) return

    const { date: storageDate } = data

    const isExpired = dayjs(storageDate).isBefore(date)
    if (isExpired) {
      storage.remove(key)
    } else {
      setStorageState(data.data)
    }
  }, [])

  return [procrastinations.data, setStorageState, reset]
}

export default useStorageProcrastinations
