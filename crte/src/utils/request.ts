import { message } from 'antd'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import { looseObj, statusMap } from '@/constant'
import getAuthToken from './getAuthToken'

axios.defaults.headers.post['Content-Type'] = 'application/json'
;(axios.defaults.headers as any).Authorization = getAuthToken()

const Service = axios.create({
  // baseURL: baseConfig.baseUrl,
  timeout: 10000,
  withCredentials: true,
})

const queue: looseObj = {}

/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config: AxiosRequestConfig) => {
  const url: string = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data),
  ].join('&')

  config.cancelToken = new axios.CancelToken((cancel) => {
    if (queue[url]) {
      const cancel = queue[url]
      console.log('---  cancel  ---\n', cancel)
      setTimeout(cancel)
    } else {
      queue[url] = cancel
    }
  })
}
/**
 * 移除请求
 * @param {Object} config
 */
const removePending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data),
  ].join('&')

  if (queue[url]) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = queue[url]
    cancel()
    delete queue[url]
  }
}

// 请求拦截器
Service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // removePending(config)
    addPending(config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 错误信息
const showStatus = (status: keyof typeof statusMap, message?: string) => {
  const type = statusMap[status] || `连接出错(${String(status)})`
  const tips = message || '请检查网络或联系管理员！'

  return `${type}，${tips}`
}

// 响应拦截器
Service.interceptors.response.use(
  (response: AxiosResponse) => {
    // removePending(response.config)
    // console.log('---  response  ---\n', response)
    // console.log('---  queue  ---\n', queue)
    return response?.data?.data ? response?.data?.data : response?.data
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log(`重复请求: ${error.message}`)
    } else {
      const { status, data } = error.response
      const msg = showStatus(status as any, data.message)
      message.error(msg)
    }

    return Promise.reject(error)
  },
)

export default Service
