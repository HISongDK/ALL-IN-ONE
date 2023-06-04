import React from 'react'
import moment from 'dayjs'
import { Tag, Space, Popconfirm, Table } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import { ColumnType } from 'antd/lib/table'
import { EChartsOption } from 'echarts'
import { dayMap, dayMapNum } from './constants'
import PlusOneGroup from './components/PlusOneGroup'

export const getOpts = (
  title: string,
  data: any = [],
  range,
  keys,
): EChartsOption => ({
  title: {
    text: title,
    textStyle: {
      fontWeight: 'normal',
      fontFamily: '宋体',
      lineHeight: 30,
    },
  },
  legend: { left: 50, top: 0 },
  tooltip: {
    trigger: 'axis',
    formatter(params: any) {
      const { date } = params?.[0]?.value || {}

      let dataContentStr = ''
      params?.forEach((item: any) => {
        const value = item.value?.[item.seriesName]

        if (!value) return

        dataContentStr += `<div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
    					margin: '20px 0'
            }}
          >
            <span>${item.marker + item.seriesName}</span>
            <span>${value}</span>
          </div>`
      })

      return `${date}<br/>${dataContentStr || '本日无数据 🙃'}`
    },
  },
  xAxis: {
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
    // dimensions: ['date', '靠墙俯卧撑', '上斜俯卧撑'],
    dimensions: keys,
    source: data,
  },
  series: keys.slice(1).map((key: string) => ({
    type: 'line',
    smooth: true,
    lineStyle: { width: 1.5 },
  })),
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

export const exerciseOptions = [
  {
    label: '俯卧撑',
    options: [
      { label: '靠墙俯卧撑', value: '靠墙俯卧撑' },
      { label: '上斜俯卧撑', value: '上斜俯卧撑' },
      { label: '膝盖俯卧撑', value: '膝盖俯卧撑' },
      { label: '半俯卧撑', value: '半俯卧撑' },
      { label: '标准俯卧撑', value: '标准俯卧撑' },
      { label: '窄距俯卧撑', value: '窄距俯卧撑' },
      { label: '偏重俯卧撑', value: '偏重俯卧撑' },
      { label: '单臂半俯卧撑', value: '单臂半俯卧撑' },
      { label: '杠杆俯卧撑', value: '杠杆俯卧撑' },
      { label: '单臂俯卧撑', value: '单臂俯卧撑' },
    ],
  },
  // {
  //   label: '深蹲',
  //   options: [
  //     { label: '肩倒立深蹲', value: '肩倒立深蹲' },
  //     { label: '折刀深蹲', value: '折刀深蹲' },
  //     { label: '支撑深蹲', value: '支撑深蹲' },
  //     { label: '半深蹲', value: '半深蹲' },
  //     { label: '标准深蹲', value: '标准深蹲' },
  //     { label: '窄距深蹲', value: '窄距深蹲' },
  //     { label: '偏重深蹲', value: '偏重深蹲' },
  //     { label: '单腿半深蹲', value: '单腿半深蹲' },
  //     { label: '单腿辅助深蹲', value: '单腿辅助深蹲' },
  //     { label: '单腿深蹲', value: '单腿深蹲' },
  //   ],
  // },
  {
    label: '引体向上',
    options: [
      { label: '垂直引体', value: '垂直引体' },
      { label: '水平引体向上', value: '水平引体向上' },
      { label: '折刀引体向上', value: '折刀引体向上' },
      { label: '半引体向上', value: '半引体向上' },
      { label: '标准引体向上', value: '标准引体向上' },
      { label: '窄距引体向上', value: '窄距引体向上' },
      { label: '偏重引体向上', value: '偏重引体向上' },
      { label: '单臂引体向上', value: '单臂引体向上' },
      { label: '单臂半引体向上', value: '单臂半引体向上' },
      { label: '单臂引体向上', value: '单臂引体向上' },
    ],
  },
  {
    label: '举腿',
    options: [
      { label: '坐姿屈膝', value: '坐姿屈膝' },
      { label: '平卧抬膝', value: '平卧抬膝' },
      { label: '平卧屈举腿', value: '平卧屈举腿' },
      { label: '平卧蛙举腿', value: '平卧蛙举腿' },
      { label: '平卧直举腿', value: '平卧直举腿' },
      { label: '悬垂屈膝', value: '悬垂屈膝' },
      { label: '悬垂屈举腿', value: '悬垂屈举腿' },
      { label: '悬垂蛙举腿', value: '悬垂蛙举腿' },
      { label: '悬垂半举腿', value: '悬垂半举腿' },
      { label: '悬垂直举腿', value: '悬垂直举腿' },
    ],
  },
  {
    label: '桥',
    options: [
      { label: '短桥', value: '短桥' },
      { label: '直桥', value: '直桥' },
      { label: '高低桥', value: '高低桥' },
      { label: '顶桥', value: '顶桥' },
      { label: '半桥', value: '半桥' },
      { label: '标准桥', value: '标准桥' },
      { label: '下行桥', value: '下行桥' },
      { label: '上行桥', value: '上行桥' },
      { label: '合桥', value: '合桥' },
      { label: '铁板桥', value: '铁板桥' },
    ],
  },
  // {
  //   label: '倒立撑',
  //   options: [
  //     { label: '靠墙顶立', value: '靠墙顶立' },
  //     { label: '乌鸦式', value: '乌鸦式' },
  //     { label: '靠墙倒立', value: '靠墙倒立' },
  //     { label: '半倒立撑', value: '半倒立撑' },
  //     { label: '标准倒立撑', value: '标准倒立撑' },
  //     { label: '窄距倒立撑', value: '窄距倒立撑' },
  //     { label: '偏重倒立撑', value: '偏重倒立撑' },
  //     { label: '单臂半倒立撑', value: '单臂半倒立撑' },
  //     { label: '杠杆倒立撑', value: '杠杆倒立撑' },
  //     { label: '单臂倒立撑', value: '单臂倒立撑' },
  //   ],
  // },
]

const allTypes: string[] = []

export const actionTypeMap = exerciseOptions.map((item) => {
  const bounds = item.options.map(({ value }) => value)

  allTypes.push(...bounds)

  return {
    title: item.label,
    bounds,
  }
})

// 补空，全量类型数据
export const allTypesMap: { [key: string]: number } = {}

allTypes.forEach((type) => {
  allTypesMap[type] = 0
})
