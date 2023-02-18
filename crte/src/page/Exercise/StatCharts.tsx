import React, { useEffect, useState } from 'react'
import { Spin, Collapse, Row, Col, Card, Radio } from 'antd'
import ReactECharts from 'echarts-for-react'
import { useStatLog } from '@api/hooks/exercise'
import { useExerciseContext } from '@/store/exercise'
import useChartsData from './hooks/useChartsData'
import useChartsOptions from './hooks/useChartsOptions'
import { radioOptions } from './config'

function StatCharts(): JSX.Element {
  const { update } = useExerciseContext()

  const [range, setRange] = useState(30)

  const { getLogStat, loading, data } = useStatLog()

  const [warmUpData, exerciseData] = useChartsData(data)

  const [warmUpOptions, exerciseOptions] = useChartsOptions(
    warmUpData,
    exerciseData,
    range,
  )

  useEffect(() => {
    getLogStat({ sort: 'date' })
  }, [update])

  const handleRadioChange = (e: any) => {
    const { value } = e.target
    setRange(value)
  }

  return (
    <Spin spinning={loading}>
      <div className="stat-radio-group">
        <Radio.Group
          value={range}
          options={radioOptions}
          onChange={handleRadioChange}
        />
      </div>

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
