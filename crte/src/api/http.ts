/**
 * @AxiosRequestConfig
 *
 * @AxiosResponse
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const Service = axios.create({
  baseURL: 'http://localhost:9000',
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  },
})

export default Service
