import React, { useEffect, useReducer, useState } from 'react'
import moment from 'moment'
import { Table, Tag, Button, Row, Space } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import ExerciseApi from '@api/exercise'
import { ColumnType } from 'antd/lib/table'
import AddDrawer from './AddDrawer'
import { SUCCESS } from '@/constant'
import { dayMap } from './constants'
import './index.scss'

function Exercise() {
  const [isAddVisible, setIsAddVisible] = useState(false)
  const [data, setData] = useState([])
  const [record, setRecord] = useState()

  const [update, dispatchUpdate] = useReducer(() => ({}), {})

  useEffect(() => {
    ExerciseApi.getLogs({ sort: '-date' }).then((res) => {
      if (res.status === SUCCESS) {
        setData(res.data.logs)
      }
    })
  }, [update])

  const handleClickEdit = (record) => {
    setIsAddVisible(true)
    setRecord(record)
  }
  const handleClickDelete = () => {}

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
      width: '23%',
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
            <EditOutlined
              className="icon edit"
              onClick={() => handleClickEdit(record)}
            />
            <DeleteOutlined className="icon delete" />
          </Space>
        )
      },
    },
  ]

  return (
    <div className="exercise_wrapper">
      <Button
        type="primary"
        className="add_log_btn"
        onClick={() => setIsAddVisible(true)}
        icon={<PlusOutlined />}
      >
        添加锻炼日志
      </Button>
      <AddDrawer
        visible={isAddVisible}
        setVisible={setIsAddVisible}
        record={record}
        emitUpdate={dispatchUpdate}
        onClose={() => setRecord(undefined)}
      />
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default Exercise
