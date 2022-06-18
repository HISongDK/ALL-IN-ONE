import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import cls from 'classnames'
import routers from './router'
import './style.scss'

function FiftyProjects() {
  const [fullScreen, setFullScreen] = useState(false)

  useEffect(() => {
    const keydownHandler = (e: any) => {
      if (e.key === 'Enter') {
        setFullScreen(!fullScreen)
      }
      if (e.key === 'Escape') {
        setFullScreen(false)
      }
    }

    document.addEventListener('keydown', keydownHandler)
    return () => document.removeEventListener('keydown', keydownHandler)
  })

  return (
    <div className={cls('project-wrapper', { 'full-screen': fullScreen })}>
      <Switch>
        {routers.map((route) => (
          <Route
            key={route.path}
            path={`/50days/${route.path}`}
            component={route.component}
          />
        ))}
      </Switch>
    </div>
  )
}

export default FiftyProjects
