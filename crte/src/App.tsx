import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
// import { useLocalStorage } from '@/utils/hooks'
import Login from '@/page/Login/Login'
import Register from '@/page/Login/Register'
import Home from './page/Home/Home'
import { USER_AUTH_TOKEN } from './constant'
import storage from './utils/storage'

function App() {
  const isLogin = storage.get(USER_AUTH_TOKEN)

  return isLogin ? <Home /> : <Redirect to="/login" />
}

export default App
