import React, { Dispatch, SetStateAction, useState } from 'react'
import moment from 'moment'
import { Space, Popconfirm, Tag, Table } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import { ColumnType } from 'antd/lib/table'
import { useDeleteLog } from '@api/hooks/exercise'
import { dayMap } from './constants'
import PlusOneGroup from './components/PlusOneGroup'

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

  const columns: ColumnType<any>[] = [
    {
      title: '日期',
      key: 'date',
      dataIndex: 'date',
      width: '23%',
      render(time: string) {
        return (
          <>
            {moment(time).format('YYYY-MM-DD HH:mm:ss')}{' '}
            <Tag>{dayMap[moment(time).day()]}</Tag>
          </>
        )
      },
    },
    {
      title: '热身',
      key: 'warmUp',
      dataIndex: 'warmUp',
      width: '23%',
      render(val: any[]) {
        return val.map((item) => (
          <div key={item.type}>
            {item.type}: {item.groupCounts} * {item.perGroupTimes}
          </div>
        ))
      },
    },
    {
      title: '锻炼',
      key: 'exercise',
      dataIndex: 'exercise',
      width: '23%',
      render(val: any[], record: any) {
        return val.map((item, index) => (
          <div key={item.type}>
            {item.type}:{' '}
            <PlusOneGroup
              index={index}
              type="exercise"
              record={record}
              emitLoading={setPlusLoading}
            >
              {item.groupCounts}
            </PlusOneGroup>
            x {item.perGroupTimes}
          </div>
        ))
      },
    },
    {
      title: '描述',
      key: 'description',
      dataIndex: 'description',
      width: '23%',
      render(val: string) {
        return (
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: val?.replaceAll('\n', '<br/>') }}
          />
        )
      },
    },
    {
      title: '操作',
      key: 'op',
      width: 100,
      align: 'center',
      render(_, record) {
        return (
          <Space>
            <EditOutlined
              className="icon edit"
              onClick={() => handleClickEdit(record)}
            />
            <Popconfirm
              placement="topRight"
              title="是否确定删除当前日志？"
              icon={<CloseCircleOutlined style={{ color: 'red' }} />}
              onConfirm={() => handleClickDelete(record._id)}
              okText="确定"
              cancelText="取消"
            >
              <DeleteOutlined className="icon delete" />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]
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
