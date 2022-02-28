import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Routes, Switch } from 'react-router-dom'
import { registerMicroApps, start } from 'qiankun'
import App from './App'
import 'antd/dist/antd.min.css'
import './index.css'

ReactDOM.render(
  <Routes>
    <Switch>
      <App />
    </Switch>
  </Routes>,
  document.getElementById('root'),
)
