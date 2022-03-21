import axios from 'axios'
// 没啥东西，就先不引入 baseConfig 了

const Service = axios.create({
  timeout: 3000,
})

const NeteaseService = axios.create({
  baseURL: 'http://localhost:5678',
  withCredentials: true,
})

export { Service, NeteaseService }
