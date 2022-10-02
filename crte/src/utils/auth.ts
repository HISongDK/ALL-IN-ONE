import qs from 'qs'
import { AxiosRequestConfig } from 'axios'
import { USER_AUTH_TOKEN } from '@/constant'
import storage from './storage'

export function getAuthToken() {
  const token = storage.get(USER_AUTH_TOKEN) || ''
  if (token) return `Bearer ${token}`
}

export function getUrlString(config: AxiosRequestConfig = {}) {
  let data
  try {
    data = JSON.parse(config.data)
  } catch (e) {
    data = config.data
  }

  return [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(data),
  ].join('&')
}
