/**
 * @AxiosRequestConfig
 *
 * @AxiosResponse
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const Service = axios.create({
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  },
})
