import React, { useEffect } from 'react'
import { registerMicroApps, start } from 'qiankun'
import { Route, Link } from 'react-router-dom'
import { Button } from 'antd'
import microApps from './micro'
import routes from './router/index'

function App() {
  useEffect(() => {
    registerMicroApps(microApps)
    start()
  }, [])

  const changeTheme = () => {
    const root = document.documentElement
    const domCls = root.className
    if (domCls.includes('dark')) {
      root.className = 'light'
    } else {
      root.className = 'dark'
    }
  }

  return (
    <>
      <Button onClick={changeTheme}>切换主题</Button>
      {routes.map((route) => (
        <Link key={route.path} to={route.path}>
          {route.name}
        </Link>
      ))}
      {routes.map((route) => (
        <Route path={route.path} component={route.component} />
      ))}
    </>
  )
}

export default App
