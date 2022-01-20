import React from 'react'
import { Redirect } from 'react-router-dom'
import Home from './page/Home/Home'

import './index.css'

function App() {
  const isLogin = localStorage.getItem('token')
  if (!isLogin) {
    return <Redirect to="/login" />
  }

  return <Home />
}

export default App
