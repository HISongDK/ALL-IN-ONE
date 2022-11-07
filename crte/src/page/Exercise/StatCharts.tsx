import React, { useEffect, useMemo } from 'react'
import moment from 'moment'
import { Spin, Collapse, Row, Col, Card } from 'antd'
import ReactECharts from 'echarts-for-react'
import { useStatLog } from '@api/hooks/exercise'
import { useExerciseContext } from '@/store/exercise'
import getOpts from './config'

type Props = {}

function StatCharts({}: Props) {
  const { update } = useExerciseContext()

  const { getLogStat, loading, data } = useStatLog()

  const [warmUpData, exerciseData] = useMemo(() => {
    const warm = data.map((item: any) => ({
      date: moment(item.date).format('YYYY-MM-DD'),
      ...item.warmUp,
    }))
    const exercise = data.map((item: any) => ({
      date: moment(item.date).format('YYYY-MM-DD'),
      ...item.exercise,
    }))
    return [warm, exercise]
  }, [data])

  const [warmUpOptions, exerciseOptions] = useMemo(() => {
    return [getOpts('热身：', warmUpData), getOpts('锻炼：', exerciseData)]
  }, [warmUpData, exerciseData])

  useEffect(() => {
    getLogStat({})
  }, [update])

  return (
    <Spin spinning={loading}>
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel header="俯卧撑" key="1">
          <Row gutter={30}>
            <Col span={12}>
              <Card
                bodyStyle={{ padding: 0 }}
                style={{ height: 300, borderRadius: 5 }}
              >
                <ReactECharts option={warmUpOptions} />
              </Card>
            </Col>
            <Col span={12}>
              <Card
                bodyStyle={{ padding: 0 }}
                style={{ height: 300, borderRadius: 5 }}
              >
                <ReactECharts option={exerciseOptions} />
              </Card>
            </Col>
          </Row>
        </Collapse.Panel>
      </Collapse>
    </Spin>
  )
}

export default StatCharts
