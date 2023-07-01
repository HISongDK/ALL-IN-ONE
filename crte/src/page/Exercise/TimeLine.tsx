import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import moment from 'dayjs'
import { Row, Spin, Timeline, Typography, Tag, Space } from 'antd'
import { BaseType } from 'antd/lib/typography/Base'
import _ from 'lodash'
import PlusOneGroup from './components/PlusOneGroup'
import { looseObj } from '@/constant'
import { dayMap } from './constants'
import { useExerciseContext } from '@/store/exercise'

const { Text } = Typography

interface ITimeline {
  dataSource: any[]
  logsLoading: boolean
  setIsAddVisible: Dispatch<SetStateAction<Boolean>>
  setRecord: Dispatch<SetStateAction<looseObj>>
}

interface IGetText {
  type: 'warmUp' | 'exercise'
  data: looseObj
  record: looseObj
  textType?: BaseType
}

function TimeLine({
  dataSource = [],
  logsLoading,
  setIsAddVisible,
  setRecord,
}: ITimeline) {
  const locateFlag = useRef()
  const scrollContainer = useRef()

  const { dispatchUpdate } = useExerciseContext()

  const [lazyLoadedData, setLazyLoadedData] = useState()

  const data = useMemo(() => {
    const data = dataSource.slice()
    const firstIsToday = moment(data[0]?.date).isSame(moment(), 'day')
    if (!firstIsToday)
      data.unshift({ date: moment().startOf('day'), isDiscontinue: true })

    // 补全空闲日程
    for (let i = 0; i < data.length; i++) {
      if (i !== data.length - 1) {
        const item = data[i]
        const next = data[i + 1]

        const lastDay = moment(item.date).subtract(1, 'day')
        const isDiscontinue = !lastDay.isSame(moment(next.date)) // NOTE: notSame is discontinue

        if (isDiscontinue) {
          // NOTE: splice add element before index params
          data.splice(i + 1, 0, {
            date: lastDay.valueOf(),
            isDiscontinue: true,
          })
        }
      }
    }

    // 空闲日合理休息标识
    const finallyData = data.map((item, index) => {
      if (item.isDiscontinue) {
        const lastFiveDays = data.slice(index + 1, index + 6)
        const hasDiscontinue = lastFiveDays.find((item) => item.isDiscontinue)
        if (!hasDiscontinue) return { ...item, reasonableRest: true }
      }
      return item
    })

    return finallyData
  }, [dataSource])

  useEffect(() => {
    setLazyLoadedData(data.slice(0, 20))
  }, [data])

  const handleLazyLoad = () => {
    const y = locateFlag.current?.getBoundingClientRect()?.y
    const { clientHeight } = document.body
    if (y - clientHeight < 200) {
      setLazyLoadedData((prev: any) => {
        return data.slice(0, prev.length + 20)
      })
    }
  }

  const throttledLazyLoadFn = _.throttle(handleLazyLoad, 20)

  useEffect(() => {
    scrollContainer.current?.addEventListener('scroll', throttledLazyLoadFn)
    return () =>
      scrollContainer.current?.removeEventListener(
        'scroll',
        throttledLazyLoadFn,
      )
  }, [data])

  const handleClickEdit = (record: any) => {
    setIsAddVisible(true)
    setRecord({
      ...record,
      isAdd: !record.exercise, // 没有锻炼记录为新增
    })
  }

  const getText = ({ data, record, textType, type }: IGetText) => {
    return (
      <Text type={textType}>
        {data?.map((item: any, index: number) => {
          return (
            <Row
              key={index}
              style={{ marginBottom: index === data.length - 1 ? 8 : 0 }}
            >
              {item.type}:
              <PlusOneGroup
                type={type}
                index={index}
                record={record}
                emitLoading={dispatchUpdate}
              >
                {item.groupCounts}
              </PlusOneGroup>
              x {item.perGroupTimes}
            </Row>
          )
        })}
      </Text>
    )
  }

  return (
    <Spin spinning={logsLoading}>
      <div ref={scrollContainer} className="time_line_wrapper">
        <Timeline mode="left" style={{ minHeight: 300, width: '80%' }}>
          {lazyLoadedData?.map((item: looseObj) => {
            return (
              <Timeline.Item
                key={item.date}
                color={item.isDiscontinue && 'gray'}
                label={
                  <Space size={4}>
                    {moment(item.date).format('YYYY-MM-DD')}
                    <Tag
                      color={(() => {
                        if (item.reasonableRest) return 'gold'
                        if (item.isDiscontinue) return 'default'
                        return 'processing'
                      })()}
                      style={{ zoom: '.9', cursor: 'pointer' }}
                      onClick={() => handleClickEdit(item)}
                    >
                      {dayMap[moment(item.date).day()]}
                    </Tag>
                  </Space>
                }
              >
                {item.isDiscontinue ? (
                  <br />
                ) : (
                  <>
                    热身：
                    {getText({
                      type: 'warmUp',
                      data: item.warmUp,
                      record: item,
                      textType: 'secondary',
                    })}
                    锻炼：{' '}
                    {getText({
                      type: 'exercise',
                      data: item.exercise,
                      record: item,
                    })}
                    {!!item.description && (
                      <>
                        描述：
                        <Text type="secondary">{item.description}</Text>
                      </>
                    )}
                  </>
                )}
              </Timeline.Item>
            )
          })}
        </Timeline>
        <div ref={locateFlag} />
      </div>
    </Spin>
  )
}

export default TimeLine
