import React, { useState } from 'react'
import './style.scss'

export const TabItem = (props: any) => <div {...props} /> // 原来可以直接这么写，我以为 children 还是要嵌进去的

interface ITabs {
  defaultIndex?: number
  onTabClick: (newTab: number) => void
  children: React.ReactElement[]
}

function Tabs({ defaultIndex = 0, onTabClick, children }: ITabs) {
  const [bindIndex, setBindIndex] = useState(defaultIndex)

  const changeTab = (newTab: number) => {
    if (typeof onTabClick === 'function') {
      onTabClick(newTab)
      setBindIndex(newTab)
    }
  }

  // @ts-ignore
  const items = children.filter((item) => item.type.name === 'TabItem')

  return (
    <div className="tab-wrapper">
      <div className="tab-menu">
        {items.map(({ props: { index, label } }: any) => (
          <button
            type="button"
            key={`tab-btn-${index}`}
            onClick={() => changeTab(index)}
            className={bindIndex === index ? 'focus' : ''}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="tab-view">
        {items.map(({ props }: any) => (
          <div
            {...props}
            className={`tab-content ${
              bindIndex === props.index ? 'selected' : ''
            }`}
            key={`tab-content-${props.index}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Tabs
