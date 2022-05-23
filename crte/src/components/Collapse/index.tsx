import React, { useState } from 'react'
import './index.scss'

interface ICollapse {
  children: React.ReactNode
  collapsed: boolean
}

function Collapse({ collapsed, children }: ICollapse) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed)

  return (
    <>
      <button
        type="button"
        className="collapse-button"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? 'Show' : 'Hide'} content
      </button>
      <div
        className={`collapse-content ${isCollapsed ? 'collapsed' : 'expanded'}`}
        aria-expanded={isCollapsed}
      >
        {children}
      </div>
    </>
  )
}

export default Collapse
