import React, { ReactElement, useEffect } from 'react'
import { message } from 'tea-component'
import service from '../../api/index'

function CrossDomain(): ReactElement {
  useEffect(() => {
    service
      .get('/cross-domain')
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        message.error({
          content: '报错了，看看是不是跨域',
        })
      })
  }, [])
  return <div>前端配置跨域代理</div>
}

export default CrossDomain
