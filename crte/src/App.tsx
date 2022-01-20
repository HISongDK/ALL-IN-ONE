import React from 'react'
import { Redirect } from 'react-router-dom'
// import { useStoreState, useStoreActions } from 'easy-peasy'
import Home from './page/Home/Home'

import './index.css'

function App() {
  const isLogin = localStorage.getItem('token')
  if (!isLogin) {
    return <Redirect to="/login" />
  }

  // const todos = useStoreState((state: any) => state.todos.list)
  // const del = useStoreActions((actions: any) => actions.todos.delete)

  return <Home />
}

export default App
