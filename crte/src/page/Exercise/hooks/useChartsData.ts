import moment from 'dayjs'
import React, { useMemo } from 'react'
import { actionTypeMap } from '../config'

function useChartsData(data: any) {
  const chartRawData = useMemo(() => {
    const allDataGroup: any = {}

    for (let i = 0; i < data.length; i++) {
      const item = data[i]
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

      console.log('---  allDataGroup  ---\n', allDataGroup)

      // 补空
      // if (i !== data.length - 1) {
      //   const nextData = data[i + 1]
      //   const realNextDay = moment(item.date).add(1, 'day')
      //   const isDiscontinue = !realNextDay.isSame(moment(nextData.date))
      //   if (isDiscontinue) {
      //     data.splice(i + 1, 0, {
      //       date: realNextDay.valueOf(),
      //       exercise: {
      //         上斜俯卧撑: 0,
      //         靠墙俯卧撑: 0,
      //       },
      //       warmUp: {
      //         上斜俯卧撑: 0,
      //         靠墙俯卧撑: 0,
      //       },
      //     })
      //   }
      // }
    }

    // console.log('---  allDataGroup  ---\n', allDataGroup)

    const warm = data.map((item: any) => ({
      date: moment(item.date).format('YYYY-MM-DD'),
      ...item.warmUp,
    }))

    const exercise = data.map((item: any) => ({
      date: moment(item.date).format('YYYY-MM-DD'),
      ...item.exercise,
    }))

    return allDataGroup
  }, [data])

  return chartRawData
}

export default useChartsData
