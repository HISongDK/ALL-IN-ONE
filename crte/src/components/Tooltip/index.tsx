import React, { useState } from 'react'
import './style.scss'

function Tooltip({ children, text, ...rest }: any) {
  const [show, setShow] = useState(false)
  return (
    <div className="tooltip-container">
      <div className={show ? 'tooltip-box visible' : 'tooltip-box'}>
        {text} <span className="tooltip-arrow" />
      </div>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        {...rest}
      >
        {children}
      </div>
    </div>
  )
}

export default Tooltip
