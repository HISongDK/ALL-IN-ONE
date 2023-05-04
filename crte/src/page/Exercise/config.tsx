import React from 'react'
import moment from 'dayjs'
import { Tag, Space, Popconfirm, Table } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import { ColumnType } from 'antd/lib/table'
import { dayMap, dayMapNum } from './constants'
import PlusOneGroup from './components/PlusOneGroup'

export const getOpts = (title: string, data: any = [], range) => ({
  title: {
    text: title,
    textStyle: {
      fontWeight: 'normal',
      fontFamily: '宋体',
      lineHeight: 30,
    },
  },
  legend: { top: 15 },
  tooltip: { trigger: 'axis' },
  xAxis: {
    // type: 'time',
    type: 'category',
    interval: 0,
    axisLabel: {
      formatter: (val: string) => {
        return val.slice(5)
      },
    },
  },
  yAxis: {
    type: 'value',
  },
  dataset: {
    dimensions: ['date', '靠墙俯卧撑', '上斜俯卧撑'],
    source: data,
  },
  series: [
    {
      type: 'line',
      smooth: true,
      lineStyle: { width: 1.5 },
    },
    {
      type: 'line',
      smooth: true,
      lineStyle: { width: 1.5 },
    },
  ],
  dataZoom: [
    {
      type: 'inside',
      // minSpan: 30,
      // maxSpan: 30,
      minSpan: range === 'custom' ? 3 : range,
      maxSpan: range === 'custom' ? undefined : range,
      start: 100,
    },
    {
      type: 'slider',
      height: 20,
    },
  ],
})

export const getColumns: ({}: any) => ColumnType<any>[] = ({
  setPlusLoading,
  handleClickEdit,
  handleClickDelete,
}) => [
  {
    title: '日期',
    key: 'date',
    dataIndex: 'date',
    width: '23%',
    render(time: string) {
      return (
        <>
          {moment(time).format('YYYY-MM-DD')}{' '}
          <Tag>{dayMap[moment(time).day() as dayMapNum]}</Tag>
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

export const radioOptions = [
  {
    label: '自定义',
    value: 'custom',
  },
  {
    label: '近一年',
    value: 365,
  },
  {
    label: '近半年',
    value: 184,
  },
  {
    label: '近三月',
    value: 90,
  },
  {
    label: '近一月',
    value: 30,
  },
  {
    label: '近一周',
    value: 7,
  },
]
