import React, { useEffect } from 'react'
import { registerMicroApps, start } from 'qiankun'
import { Route, Link } from 'react-router-dom'
import microApps from './micro'
import routes from './router/index'

function App() {
  useEffect(() => {
    registerMicroApps(microApps)
    start()
  }, [])
  return (
    <>
      {routes.map((route) => (
        <>
          <Link to={route.path}>{route.name}</Link>
          <Route path={route.path} component={route.component} />
        </>
      ))}
    </>
  )
}

export default App
