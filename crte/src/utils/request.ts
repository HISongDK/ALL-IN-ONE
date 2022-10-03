import { message } from 'antd'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { looseObj, statusMap } from '@/constant'
import { getAuthToken, getUrlString } from './auth'

// 指定默认请求头
axios.defaults.headers.post['Content-Type'] = 'application/json'
;(axios.defaults.headers as any).Authorization = getAuthToken()

// 创建 axios 实例
const Service = axios.create({
  timeout: 10000,
  withCredentials: true,
})

// 错误信息
const showStatus = (status: keyof typeof statusMap, message?: string) => {
  const type = statusMap[status] || `连接出错(${String(status)})`
  const tips = message || '请检查网络或联系管理员！'

  return `${type}，${tips}`
}

// 接口防抖处理
const queue: looseObj = {}
const setQueue = (config: AxiosRequestConfig) => {
  const url = getUrlString(config)

  const cancelToken = axios.CancelToken
  const source = cancelToken.source()
  config.cancelToken = source.token

  if (queue[url]) {
    source.cancel()
  } else {
    queue[url] = true
  }
}
const removeQueue = (config: AxiosRequestConfig = {}) => {
  const url = getUrlString(config)
  delete queue[url]
}

// 请求拦截器
Service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    setQueue(config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
Service.interceptors.response.use(
  (response: AxiosResponse) => {
    removeQueue(response.config)
    return response?.data?.data ? response?.data?.data : response?.data
  },
  (error) => {
    // 错误请求响应后，取消请求 error 无 config,不会清除记录，避免失效
    removeQueue(error.config)

    if (axios.isCancel(error)) {
      console.log(`重复请求: ${error.message}`)
    } else if (error.response) {
      const { status, data } = error.response
      const msg = showStatus(status as any, data?.message)
      message.error(msg)
    }

    return Promise.reject(error)
  },
)

export default Service
