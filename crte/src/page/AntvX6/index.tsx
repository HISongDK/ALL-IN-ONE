import React, { useEffect, useState } from 'react'
import { Graph } from '@antv/x6'
import { Typography } from 'antd'
import Topology from './Topology'
import ProcessChart from './GptGraphy'

const { Title } = Typography

function AntvX6() {
  // 初始，mounted生命周期时, container组件还没挂载。
  const [container, setContainer] = useState<HTMLElement>(
    document.createElement('div'),
  )
  const data = {
    // 节点
    nodes: [
      {
        id: 'node1', // String，可选，节点的唯一标识
        // x: 40, // Number，必选，节点位置的 x 值
        // y: 40, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: 'hello', // String，节点标签
      },
      {
        id: 'node2', // String，节点的唯一标识
        // x: 160, // Number，必选，节点位置的 x 值
        // y: 180, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: 'world', // String，节点标签
      },
    ],
    // 边
    edges: [
      {
        source: 'node1', // String，必须，起始节点 id
        target: 'node2', // String，必须，目标节点 id

        attrs: {
          line: {
            stroke: '#1890ff',
            strokeDasharray: 5,
            targetMarker: 'classic',
          },
        },
      },
    ],
  }

  // 获取container对象
  const refContainer = (container: HTMLDivElement) => {
    setContainer(container)
  }
  // 官方文档写的是componentDidMount，因为react取消了三个生命周期函数，所以使用useEffect
  useEffect(() => {
    const graph = new Graph({
      container,
      width: 800,
      height: 600,
      defaultNode: {
        type: 'rect',
        style: {
          stroke: 'linear-gradient(to right, red, blue)',
          lineWidth: 2,
          strokeOpacity: 1,
        },
      },
      defaultEdge: {
        style: {
          stroke: '#666',
          lineDash: [4, 4],
        },
      },
    })
    // 获取画布所有的的节点和边
    const nodes = graph.getNodes()
    const edges = graph.getEdges()
    // 修改没一个节点的属性
    nodes.forEach((node) => {
      node.attr('body', {
        stroke: '#1890ff', // 节点颜色
        fill: 'white', // 节点填充色
      })
      node.attr('label', {
        // text: 'rect', // 文本
        // fill: '#333', // 文字颜色
        // fontSize: 13, // 文字大小
      })
      node.resize(40, 20) // 重置节点大小
    })
    edges.forEach((edge) => {
      edge.attr('line', {
        stroke: '#1890ff', // 边颜色
        strokeDasharray: 5, // 边线条粗细
        targetMarker: 'classic',
        style: {
          animation: 'ant-line 30s infinite linear',
        },
      })
    })

    graph.fromJSON(data)
  })

  return (
    <>
      <div
        id="container"
        ref={refContainer}
        style={{ border: '1px solid #000' }}
      />
      <Title>ECharts GPT Topology</Title>
      <Topology />

      <Title>Antv/X6 GPT Topology</Title>
      <ProcessChart />
    </>
  )
}
export default AntvX6
