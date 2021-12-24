import React, { ReactElement, useEffect } from 'react'
import { message } from 'tea-component'
import './style.less'
import service from '../../api/index'

function CrossDomain(): ReactElement {
  useEffect(() => {
    service
      .get('/api/cross-domain')
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        message.error({
          content: '报错了，看看是不是跨域',
        })
      })
  }, [])
  return (
    <div>
      前端配置跨域代理 <hr />
      <h2>多少有点坑人了</h2>
      <br />
      <p>
        本来今天用 craco.config.js 里面 devServer 的 proxy
        字段配了好久，愣是不行。
      </p>
      刚才好不用发现直接在 package.json 里面加一个 proxy
      字段，重跑项目重启浏览器就行了。
    </div>
  )
}

export default CrossDomain
