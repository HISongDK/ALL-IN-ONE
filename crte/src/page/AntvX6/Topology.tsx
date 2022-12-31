import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const Topology = ({ data }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    const chart = echarts.init(chartRef.current)

    const nodes = []
    const links = []

    // 生成模拟数据
    for (let i = 0; i < 10; i++) {
      nodes.push({
        id: i,
        name: `node-${i}`,
        symbolSize: 10 + i * 5,
        value: i,
        category: i % 2 === 0 ? 0 : 1,
        itemStyle: {
          color: i % 2 === 0 ? '#3182bd' : '#fd8d3c',
        },
      })
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes.length; j++) {
        if (Math.random() > 0.5) {
          links.push({
            source: i,
            target: j,
            value: Math.random() * 10,
          })
        }
      }
    }

    chart.setOption({
      series: [
        {
          type: 'graph',
          layout: 'force',
          data: nodes,
          edges: links,
          roam: true,
          label: {
            normal: {
              position: 'right',
            },
          },
          force: {
            repulsion: 1000,
          },
        },
      ],
    })
  }, [])

  return <div ref={chartRef} style={{ width: '600px', height: '400px' }} />
}

export default Topology
