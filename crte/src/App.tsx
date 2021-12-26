import React from 'react'
import './index.css'

import { useStoreState, useStoreActions } from 'easy-peasy'

import Home from './page/Home/Home'
import { Redirect } from 'react-router-dom'

function App() {
  const isLogin = localStorage.getItem('user_login_info')
  if (!isLogin) {
    // 本来昨天试的直接这么写有时候生效有时候不生效
    // 今天这么写又完全没问题了，真是莫名其妙
    // 还是有什么莫名其妙的 bug 的话，先重启试试
    return <Redirect to="/login" />
  }

  const todos = useStoreState((state: any) => state.todos.list)
  const del = useStoreActions((actions: any) => actions.todos.delete)

  return <Home />
}

export default App
