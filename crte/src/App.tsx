import React from 'react'
import { Redirect } from 'react-router-dom'
import Home from './page/Home/Home'

function App() {
  // TODO: 登录相关先去掉
  // const isLogin = sessionStorage.getItem('token')
  // if (!isLogin) {
  // return <Redirect to="/login" />
  // }

  return <Home />
}

export default App
