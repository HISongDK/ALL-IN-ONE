import React from 'react'
import { Link, Route } from 'react-router-dom'
import Routes from '@/router'

function App() {
  return (
    <>
      <Link to="/MicroPage">MicroPage</Link>
      <hr />
      {Routes.map(({ path, component }) => (
        <Route key={path} path={path} component={component} />
      ))}
    </>
  )
}

export default App
