import React, { useRef, useEffect } from 'react'
import { Graph } from '@antv/x6'

export default function ProcessChart(props) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const { data } = props

    const graph = new Graph({
      container: containerRef.current,
      width: 500,
      height: 500,
      grid: true,
      data,
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
  })

  return <div ref={containerRef} style={{ height: '500px' }} />
}

ProcessChart.defaultProps = {
  data: {
    nodes: [
      {
        id: 'node-1',
        x: 100,
        y: 100,
      },
      {
        id: 'node-2',
        x: 200,
        y: 200,
      },
    ],
    edges: [
      {
        source: 'node-1',
        target: 'node-2',
      },
    ],
  },
}
