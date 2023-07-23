import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Routes, Switch, Route } from 'react-router-dom'

import Login from '@page/Login'

import App from './App'

import './index.scss'

ReactDOM.render(
  <Routes>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/">
        <App />
      </Route>
    </Switch>
  </Routes>,
  document.getElementById('root'),
)
