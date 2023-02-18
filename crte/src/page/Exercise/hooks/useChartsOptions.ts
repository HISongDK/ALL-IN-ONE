import React, { useMemo } from 'react'
import { getOpts } from '../config'

const useChartsOptions = (warmUpData: any, exerciseData: any, range?: number) =>
  useMemo(
    () => [
      getOpts('热身：', warmUpData, range),
      getOpts('锻炼：', exerciseData, range),
    ],
    [warmUpData, exerciseData, range],
  )

export default useChartsOptions
