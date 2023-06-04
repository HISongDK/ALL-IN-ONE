import React from 'react'
import { Collapse, Row, Col, Card } from 'antd'
import ReactECharts from 'echarts-for-react'
import { EChartsOption } from 'echarts'

export interface ICollapseChart {
  data: {
    title: string
    warmUpOptions: EChartsOption
    exerciseOptions: EChartsOption
  }
}
function CollapseChart({ data }: ICollapseChart) {
  const { title, warmUpOptions, exerciseOptions } = data

  return (
    <Collapse defaultActiveKey={['1']} style={{ marginBottom: 20 }}>
      <Collapse.Panel header={title} key="1">
        <Row gutter={30}>
          <Col span={12}>
            <Card
              bodyStyle={{ padding: 0 }}
              style={{ height: 300, borderRadius: 5 }}
            >
              <ReactECharts option={warmUpOptions} style={{ width: '100%' }} />
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
  )
}

export default CollapseChart
