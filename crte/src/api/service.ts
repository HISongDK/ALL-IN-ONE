import axios from 'axios'

export default axios.create({
  // 跨域代理配置，取消 baseURL
  baseURL: 'http://localhost:8080/',
  timeout: 3000,
})
