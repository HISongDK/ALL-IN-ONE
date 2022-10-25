import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Table, Tag, Button, Row, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ExerciseApi from '@api/exercise'
import { ColumnType } from 'antd/lib/table'
import AddDrawer from './AddDrawer'
import { SUCCESS } from '@/constant'
import { dayMap } from './constants'

function Exercise() {
  const [isAddVisible, setIsAddVisible] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    ExerciseApi.getLogs({ sort: '-date' }).then((res) => {
      if (res.status === SUCCESS) {
        setData(res.data.logs)
      }
    })
  }, [])

  const columns: ColumnType<any>[] = [
    {
      title: '日期',
      key: 'date',
      dataIndex: 'date',
      width: '25%',
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
      width: '25%',
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
      width: '25%',
      render(val: any[]) {
        return val.map((item) => (
          <div key={item.type}>
            {item.type}: {item.groupCounts} * {item.perGroupTimes}
          </div>
        ))
      },
    },
    {
      title: '描述',
      key: 'description',
      dataIndex: 'description',
      width: '25%',
      render(val: string) {
        return (
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: val?.replace('\n', '<br/>') }}
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
            <EditOutlined style={{ color: '#1890ff', fontSize: 16 }} />
            <DeleteOutlined style={{ color: '#ff4d4f', fontSize: 16 }} />
          </Space>
        )
      },
    },
  ]

  return (
    <div>
      <AddDrawer visible={isAddVisible} setVisible={setIsAddVisible} />
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default Exercise
