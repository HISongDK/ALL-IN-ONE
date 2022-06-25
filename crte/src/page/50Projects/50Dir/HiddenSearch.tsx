import React, { useState, useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import cls from 'classnames'
import './css/HiddenSearch.scss'

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
