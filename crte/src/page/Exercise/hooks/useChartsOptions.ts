import React, { useMemo } from 'react'
import getOpts from '../config'

const useChartsOptions = (warmUpData: any, exerciseData: any) =>
  useMemo(
    () => [getOpts('热身：', warmUpData), getOpts('锻炼：', exerciseData)],
    [warmUpData, exerciseData],
  )

export default useChartsOptions
