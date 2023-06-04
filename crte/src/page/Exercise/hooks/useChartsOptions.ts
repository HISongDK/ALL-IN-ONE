import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import { getOpts } from '../config'

const useChartsOptions = (allDataGroup: any, range: number | 'custom') =>
  useMemo(() => {
    const keys = Object.keys(allDataGroup)

    const allDataGroupOpts = keys.map((key) => {
      const element = allDataGroup[key]

      const warmUpData = element.map((item: any) => ({
        date: dayjs(item.date).format('YYYY-MM-DD'),
        ...item.warmUp,
      }))
      const keys = Object.keys(warmUpData[0])

      const exerciseUpData = element.map((item: any) => ({
        date: dayjs(item.date).format('YYYY-MM-DD'),
        ...item.exercise,
      }))
      const exerciseKeys = Object.keys(exerciseUpData[0])

      const warmUpDataOpts = getOpts('热身：', range, keys, exerciseUpData)
      const exerciseDataOpts = getOpts(
        '锻炼',
        range,
        exerciseKeys,
        exerciseUpData,
      )

      return {
        title: key,
        warmUpOptions: warmUpDataOpts,
        exerciseOptions: exerciseDataOpts,
      }
    })

    return allDataGroupOpts
  }, [allDataGroup, range])

export default useChartsOptions
