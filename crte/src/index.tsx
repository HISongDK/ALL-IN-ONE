import { Spin } from 'antd'
import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Routes, Switch, Route } from 'react-router-dom'

import App from './App'

import './index.scss'

const Login = lazy(() => import('@/page/Login/Login'))
const Register = lazy(() => import('@/page/Login/Register'))

ReactDOM.render(
  <Routes>
    <Switch>
      <Suspense
        fallback={
          <div className="suspense">
            <Spin />
          </div>
        }
      >
        <Route path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/">
          <App />
        </Route>
      </Suspense>
    </Switch>
  </Routes>,
  document.getElementById('root'),
)
