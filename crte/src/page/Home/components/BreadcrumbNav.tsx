import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { breadcrumbMap } from '@/router'

function BreadcrumbNav() {
  const history = useHistory()
  const { pathname } = useLocation()

  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {pathname
        .slice(1)
        .split('/')
        .map((path, index, pathArray) => (
          <Breadcrumb.Item
            key={path}
            onClick={() =>
              index !== pathArray.length - 1 && history.push(`/${path}`)
            }
          >
            {breadcrumbMap[path] || path}
          </Breadcrumb.Item>
        ))}
    </Breadcrumb>
  )
}

export default BreadcrumbNav
