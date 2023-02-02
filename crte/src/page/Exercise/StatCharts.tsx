import React, { useEffect, useMemo } from 'react'
import { Spin, Collapse, Row, Col, Card } from 'antd'
import ReactECharts from 'echarts-for-react'
import { useStatLog } from '@api/hooks/exercise'
import { useExerciseContext } from '@/store/exercise'
import getOpts from './config'
import useChartsData from './hooks/useChartsData'
import useChartsOptions from './hooks/useChartsOptions'

function StatCharts(): JSX.Element {
  const { update } = useExerciseContext()

  const { getLogStat, loading, data } = useStatLog()

  const [warmUpData, exerciseData] = useChartsData(data)

  const [warmUpOptions, exerciseOptions] = useChartsOptions(
    warmUpData,
    exerciseData,
  )

  useEffect(() => {
    getLogStat({ sort: 'date' })
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
                <ReactECharts
                  option={warmUpOptions}
                  style={{ width: '100%' }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card
                bodyStyle={{ padding: 0 }}
                style={{ height: 300, borderRadius: 5 }}
              >
                <ReactECharts
                  option={exerciseOptions}
                  style={{ width: '100%' }}
                />
              </Card>
            </Col>
          </Row>
        </Collapse.Panel>
      </Collapse>
    </Spin>
  )
}

export default StatCharts
