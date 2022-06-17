import React from 'react'
import { useHistory } from 'react-router-dom'
import type { BadgeProps } from 'antd'
import { Badge, Calendar } from 'antd'
import type { Moment } from 'moment'
import config from './config'

const getMonthData = (value: Moment) => {
  if (value.month() === 8) {
    return 1394
  }
  return ''
}

const Home: React.FC = () => {
  const history = useHistory()

  const monthCellRender = (value: Moment) => {
    const num = getMonthData(value)
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null
  }

  const dateCellRender = (value: Moment) => {
    const listData = config[value.date()] || []
    return (
      <ul className="events">
        {listData.map((item: any, index: number) => (
          <li
            key={item.content}
            title={item.content}
            onClick={() => index && history.push(`/50days/${item.content}`)}
          >
            <Badge
              status={item.type as BadgeProps['status']}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  )
}

export default Home
