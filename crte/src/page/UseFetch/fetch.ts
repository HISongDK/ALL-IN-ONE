import { message } from 'antd'

const request = async (url: string, options: RequestInit) => {
  const headers = options.headers || {}
  options = {
    ...options,
    headers: { ...headers, 'Content-Type': 'application/json;charset:utf-8' },
    body: JSON.stringify(options.body),
  }

  try {
    const res = await fetch(url, options) // optionObj http 请求的请求方法、标头、数据体都在这个对象中设置
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    return await res.json()
  } catch (err) {
    message.error('请求失败')
    throw err
  }
}

/**
 * fetch() 第二个参数 optionObj 的完整 API
 * method:'GET'
 * headers:{ "Content-Type":"text/plain;charset=UTF-8" }
 * body: undefined
 * referrer: "about:client"
 * referrerPolicy:"no-referrer-when-downgrade"
 * mode:"cors"
 * credentials:"same=origin"
 * cache:"default"
 * redirect:"follow"
 * integrity:""
 * keepalive:false
 * signal:undefined
 */

export default request
