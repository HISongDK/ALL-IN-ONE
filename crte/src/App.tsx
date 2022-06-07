import React from 'react'
import { Redirect } from 'react-router-dom'
import { useLocalStorage } from '@/utils/hooks'
import Home from './page/Home/Home'

function App() {
  const [userInfo] = useLocalStorage('userToken')

  const isLogin = userInfo?.expires > Date.now()

  return isLogin ? <Home /> : <Redirect to="/login" />
}

export default App
