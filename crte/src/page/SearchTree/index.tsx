import React from 'react'
import SearchTree from './SearchTree'

// 节点数据格式
const node = [
  {
    id: '1', // 节点ID
    text: '1 hello world', // 节点展示文案
    children: [
      {
        id: '1-1',
        text: '1-1 hello world',
      },
    ],
  },
  {
    id: '2',
    text: '2 hello world',
    children: [
      {
        id: '2-1',
        text: '2-1 hello world',
        children: [
          {
            id: '2-1-2',
            text: '2-1-2 hello world',
          },
        ],
      },
    ],
  },
]

function Parent() {
  const onChange = (id: any) => {
    console.log(`当前点击项：${id}`)
  }
  return <SearchTree data={node} onChange={onChange} />
}

export default Parent
