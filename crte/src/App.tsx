import React from 'react'
import { Redirect } from 'react-router-dom'
import { useLocalStorage } from '@/utils/hooks'
import Home from './page/Home/Home'
import { USER_AUTH_TOKEN } from './constant'
import storage from './utils/storage'

function App() {
  // const [userInfo] = useLocalStorage('userToken')
  // const isLogin = userInfo?.expires > Date.now()

  const isLogin = storage.get(USER_AUTH_TOKEN)

  return isLogin ? <Home /> : <Redirect to="/login" />
}

export default App
