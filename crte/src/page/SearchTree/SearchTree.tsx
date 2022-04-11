import React, { useState } from 'react'
import classnames from 'classnames'
import './style.scss'

function SearchTree({ data, onChange }: any) {
  const [nodeData, setNodeData] = useState(data)
  const [inputValue, setInputValue] = useState('')

  // 指定点击后数据内对应节点是否关闭
  const setClose = (stateData: any, clickedId: any) =>
    stateData.map((item: any) => {
      if (item.id === clickedId) {
        item.isClose = !item.isClose
      } else if (item?.children?.length) {
        item.children = setClose(item.children, clickedId)
      }
      /* eslint-disable consistent-return */
      return item
    })

  const onClickItem = (e: any, el: any) => {
    e.stopPropagation()
    const { id } = el
    onChange(id) // 向父组件传入点击项 id

    setNodeData((prevState: any) => {
      const newState = prevState.slice()
      return setClose(newState, id)
    })
  }

  const genHtml = (nodes: any) => {
    return (
      <ul className="search-tree">
        {nodes.map((el: any) => (
          <li
            key={el.id}
            className={classnames({
              'is-node': el?.children?.length,
              'is-close': el.isClose,
              'is-search-value': el.text === inputValue,
            })}
            onClick={(e) => onClickItem(e, el)}
          >
            {el.text}
            {el?.children?.length && genHtml(el.children)}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {genHtml(nodeData)}
    </>
  )
}

export default SearchTree
