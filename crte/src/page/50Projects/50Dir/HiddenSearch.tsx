import React, { useState, useRef } from 'react'
import cls from 'classnames'
import './HiddenSearch.scss'
import { SearchOutlined } from '@ant-design/icons'

function HiddenSearch() {
  const inpRef = useRef<any>()
  const [active, setActive] = useState(false)

  return (
    <div className="hidden_search_wrapper">
      <div className={cls('hidden_search', { active })}>
        <input
          type="text"
          ref={inpRef}
          className="input"
          placeholder="Search..."
        />
        <button
          className="btn"
          onClick={() => {
            setActive(!active)
            inpRef.current.focus()
          }}
        >
          <SearchOutlined />
        </button>
      </div>
    </div>
  )
}

export default HiddenSearch
