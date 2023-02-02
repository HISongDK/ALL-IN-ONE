import React, { Dispatch, SetStateAction, useState } from 'react'
import { Table } from 'antd'
import { useDeleteLog } from '@api/hooks/exercise'
import { getColumns } from './config'

interface IExerciseTable {
  dataSource: any[]
  logsLoading: boolean
  setIsAddVisible: (bool: boolean) => void
  setRecord: Dispatch<SetStateAction<undefined>>
  dispatchUpdate: () => void
}

function ExerciseTable({
  dataSource,
  logsLoading,
  setIsAddVisible,
  setRecord,
  dispatchUpdate,
}: IExerciseTable) {
  const [plusLoading, setPlusLoading] = useState(false)

  const { deleteLog, loading } = useDeleteLog()

  const handleClickEdit = (record: any) => {
    setIsAddVisible(true)
    setRecord(record)
  }
  const handleClickDelete = (id: string) => {
    deleteLog(id).then((res) => {
      dispatchUpdate()
    })
  }

  const columns = getColumns({
    setPlusLoading,
    handleClickEdit,
    handleClickDelete,
  })

  return (
    <Table
      rowKey={() => Math.random()}
      columns={columns}
      dataSource={dataSource}
      loading={loading || logsLoading || plusLoading}
    />
  )
}

export default ExerciseTable
