import { message } from 'antd'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'

const statusMap = {
  400: '未授权，请重新登录(401)',
  403: '拒绝访问(403)',
  404: '请求出错(404)',
  408: '请求超时(408)',
  500: '服务器错误(500)',
  501: '服务未实现(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网络超时(504)',
  505: 'HTTP版本不受支持(505)',
}

const showStatus = (status: keyof typeof statusMap) => {
  const message = statusMap[status] || `连接出错(${status})!`

  return `${message}，请检查网络或联系管理员！`
}

const Service = axios.create({
  // headers: {
  //   get: {
  //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  //   },
  //   post: {
  //     'Content-Type': 'application/json;charset=utf-8',
  //   },
  //   put: {
  //     'Content-Type': 'application/json;charset=utf-8',
  //   },
  // },

  // 是否跨站点访问控制请求
  withCredentials: true,
  timeout: 10000,
  // baseURL: baseConfig.baseUrl,
  transformRequest: [
    (data, headers) => {
      if (headers?.['Content-Type'] === 'multipart/form-data') {
        return data
      }
      data = JSON.stringify(data)
      return data
    },
  ],
  validateStatus() {
    return true
  },
  transformResponse: [
    (data) => {
      if (typeof data === 'string' && data.startsWith('{')) {
        data = JSON.parse(data)
      }
      return data
    },
  ],
})

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending: any = new Map()
/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data),
  ].join('&')
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel)
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
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}

/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}

// 请求拦截器
Service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    removePending(config) // 在请求开始前，对之前的请求做检查取消操作
    addPending(config) // 将当前请求添加到 pending 中
    return config
  },
  (error) => {
    console.log('---  error  ---\n', error)
    // 错误抛到业务代码
    error.data = {}
    error.data.msg = '服务器异常，请联系管理员！'
    return Promise.resolve(error)
  },
)

// 响应拦截器
Service.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('---  response  ---\n', response)
    removePending(response) // 在请求结束后，移除本次请求
    const { status } = response
    let msg = ''
    if (status < 200 || status >= 300) {
      msg = showStatus(status as any)
      if (typeof response.data === 'string') {
        response.data = { msg }
      } else {
        response.data.msg = msg
      }
    }

    return response.data
  },
  (error) => {
    console.log('---  error  ---\n', error)

    if (axios.isCancel(error)) {
      console.log(`repeated request: ${error.message}`)
    } else {
      error.data = {}
      error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
      message.error({
        content: error.data.msg,
      })
    }
    return Promise.resolve(error)
  },
)

export default Service
