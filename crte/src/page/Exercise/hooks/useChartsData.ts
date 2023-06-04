import moment from 'dayjs'
import React, { useMemo } from 'react'
import { actionTypeMap, allTypesMap } from '../config'

function useChartsData(data: any) {
  const chartRawData = useMemo(() => {
    const allDataGroup: any = {}

    for (let i = 0; i < data.length; i++) {
      const item = data[i]

      // 每项数据补空
      item.warmUp = { ...allTypesMap, ...item.warmUp }
      item.exercise = { ...allTypesMap, ...item.exercise }

      // 隔天补空
      if (i !== data.length - 1) {
        const nextData = data[i + 1]
        const realNextDay = moment(item.date).add(1, 'day')
        const isDiscontinue = !realNextDay.isSame(moment(nextData.date))

        if (isDiscontinue) {
          data.splice(i + 1, 0, {
            date: realNextDay.valueOf(),
            exercise: allTypesMap,
            warmUp: allTypesMap,
          })
        }
      }

      // 分组格式化数据
      actionTypeMap.forEach((actionType) => {
        const currentWarmUp = { ...item.warmUp }
        const currentExercise = { ...item.exercise }

        const currentWarmUpKeys = Object.keys(currentWarmUp)
        currentWarmUpKeys.forEach((action) => {
          if (!actionType.bounds.includes(action)) delete currentWarmUp[action]
        })

        const currentExerciseKeys = Object.keys(currentExercise)
        currentExerciseKeys.forEach((action) => {
          if (!actionType.bounds.includes(action))
            delete currentExercise[action]
        })
        ;(
          allDataGroup[actionType.title] ||
          (allDataGroup[actionType.title] = [])
        ).push({
          date: item.date,
          warmUp: currentWarmUp,
          exercise: currentExercise,
        })
      })
    }

    return allDataGroup
  }, [data])

  return chartRawData
}

export default useChartsData
