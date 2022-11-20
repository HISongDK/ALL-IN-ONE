import React, { useState } from 'react'
import { message } from 'antd'
import ExerciseApi from '../exercise'
import { looseObj } from '@/constant'

// 获取日志
export const useGetExerciseLogs = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any[]>()

  const getLogs = (params: looseObj) => {
    setLoading(true)
    return ExerciseApi.getLogs(params)
      .then((res) => {
        setData(res.data.logs)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return { loading, getLogs, data }
}

// 删除日志
export const useDeleteLog = () => {
  const [loading, setLoading] = useState(false)

  const deleteLog = (id: string) => {
    setLoading(true)
    return ExerciseApi.deleteLog(id)
      .then(() => {
        message.success('删除日志成功')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return { deleteLog, loading }
}

// 更新日志
export const useUpdateLog = () => {
  const [loading, setLoading] = useState(false)

  const updateLog = (data: looseObj) => {
    setLoading(true)
    return ExerciseApi.updateLog(data)
      .then(() => {
        message.success('更新日志成功')
        return data
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return { updateLog, loading }
}

// 日志统计
export const useStatLog = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>([])

  const getLogStat = (data: looseObj = {}) => {
    setLoading(true)
    ExerciseApi.getStat(data)
      .then((res) => {
        setData(res.data.stat)
        return data
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return { getLogStat, loading, data }
}
