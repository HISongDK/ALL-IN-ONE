import React from 'react'
import { Redirect } from 'react-router-dom'
import Home from './page/Home/Home'

function App() {
  const isLogin = sessionStorage.getItem('token')

  return isLogin ? <Home /> : <Redirect to="/login" />
}

export default App
