import moment from 'moment'
import React, { useMemo } from 'react'

function useChartsData(data: any) {
  const [warmUpData, exerciseData] = useMemo(() => {
    for (let i = 0; i < data.length; i++) {
      if (i !== data.length - 1) {
        const item = data[i]
        const nextData = data[i + 1]
        const realNextDay = moment(item.date).add(1, 'day')
        const isDiscontinue = !realNextDay.isSame(moment(nextData.date))
        if (isDiscontinue) {
          data.splice(i + 1, 0, {
            date: realNextDay.valueOf(),
            exercise: {
              上斜俯卧撑: 0,
              靠墙俯卧撑: 0,
            },
            warmUp: {
              上斜俯卧撑: 0,
              靠墙俯卧撑: 0,
            },
          })
        }
      }
    }

    const warm = data.map((item: any) => ({
      date: moment(item.date).format('YYYY-MM-DD'),
      ...item.warmUp,
    }))

    const exercise = data.map((item: any) => ({
      date: moment(item.date).format('YYYY-MM-DD'),
      ...item.exercise,
    }))

    return [warm, exercise]
  }, [data])

  return [warmUpData, exerciseData]
}

export default useChartsData
