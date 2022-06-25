import React, { useState } from 'react'
import cls from 'classnames'
import './css/ProgressStep.scss'

function ProgressStep() {
  const [active, setActive] = useState(1)
  return (
    <div className="progress-wrapper">
      <div className="progress-container">
        <div
          className="progress"
          // 分数转百分比
          style={{ width: `${((active - 1) / (4 - 1)) * 100}%` }}
        />
        {Array(4)
          .fill('')
          .map((_, index) => (
            <div
              key={index}
              className={cls('circle', { active: index + 1 <= active })}
            >
              {index + 1}
            </div>
          ))}
      </div>

      <div className="btns">
        <button
          id="prev"
          className="btn"
          disabled={active === 1}
          onClick={() => setActive(active - 1)}
        >
          上一步
        </button>
        <button
          className="btn"
          id="next"
          disabled={active === 4}
          onClick={() => setActive(active + 1)}
        >
          下一步
        </button>
      </div>
    </div>
  )
}

export default ProgressStep
