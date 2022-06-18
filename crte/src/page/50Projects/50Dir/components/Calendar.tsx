import React from 'react'
import { useHistory } from 'react-router-dom'
import type { BadgeProps } from 'antd'
import { Badge, Calendar } from 'antd'
import type { Moment } from 'moment'
import config from '../../config'

const Home: React.FC = () => {
  const history = useHistory()

  const dateCellRender = (value: Moment) => {
    const listData = config[value.format('YYYYMMDD')] || []

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

  return <Calendar dateCellRender={dateCellRender} />
}

export default Home
