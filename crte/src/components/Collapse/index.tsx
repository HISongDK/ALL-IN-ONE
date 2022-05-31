import React, { useState } from 'react'
import useToggle, { useReducerToggle } from '@/page/UseFetch/useToggle'
// import { useToggle } from 'ahooks'
import './index.scss'

interface ICollapse {
  children: React.ReactNode
  collapsed: boolean
}

function Collapse({ collapsed, children }: ICollapse) {
  // const [isCollapsed, setIsCollapsed] = useState(collapsed)
  // const [isCollapsed, toggleCollapsed] = useToggle(collapsed)
  const [isCollapsed, toggleCollapsed] = useReducerToggle(collapsed)

  return (
    <>
      <button
        type="button"
        className="collapse-button"
        // onClick={() => setIsCollapsed(!isCollapsed)}
        // onClick={toggleCollapsed.toggle}
        onClick={toggleCollapsed as any}
      >
        {isCollapsed ? 'Show' : 'Hide'} content
      </button>
      <div
        className={`collapse-content ${isCollapsed ? 'collapsed' : 'expanded'}`}
        aria-expanded={isCollapsed as any}
      >
        {children}
      </div>
    </>
  )
}

export default Collapse
