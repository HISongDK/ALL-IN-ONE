import React from 'react'
import { Button, Popover, message } from 'antd'
import ExerciseApi from '@api/exercise'
import { looseObj, SUCCESS } from '@/constant'

type Props = {
  record: looseObj
  index: number
  emitLoading: (bool: boolean) => void
}

const PlusOneGroup: React.FC<Props> = ({
  record,
  index,
  emitLoading,
  children,
}) => {
  const handleExerciseGroupsPlusOne = async (record: any, addIndex: any) => {
    emitLoading(true)
    const originCounts = record.exercise[addIndex].groupCounts
    record.exercise[addIndex].groupCounts = originCounts + 1

    const data = await ExerciseApi.updateLog(record).finally(() =>
      emitLoading(false),
    )

    console.log('---  data  ---\n', data)

    if (data.status === SUCCESS) {
      message.success('增加组数成功')
    }
  }
  return (
    <Popover
      content={
        <Button onClick={() => handleExerciseGroupsPlusOne(record, index)}>
          {' '}
          +1{' '}
        </Button>
      }
    >
      <span style={{ display: 'inline-block', padding: '0 3px' }}>
        {children}
      </span>
    </Popover>
  )
}

export default PlusOneGroup
