import { USER_AUTH_TOKEN } from '@/constant'
import storage from './storage'

export default function getAuthToken() {
  const token = storage.get(USER_AUTH_TOKEN) || ''
  if (token) return `Bearer ${token}`
}
