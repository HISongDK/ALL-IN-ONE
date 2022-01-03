/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'

function DynamicRoute() {
  const { params } = useParams<{ params: string }>()

  // eslint-disable-next-line
  console.log(`动态路由参数：${params}`)

  const history = useHistory()

  if (!params.includes('1')) {
    // eslint-disable-next-line
    alert('参数无效')
    // history.goBack()
  }

  return (
    <div>
      动态路由调试
      <hr />
      <h3>目的</h3>
      <ul>
        <li>动态参数无效时，显示无效结果或返回页面</li>
      </ul>
    </div>
  )
}

export default DynamicRoute
