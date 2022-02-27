import React, { useEffect } from 'react'
import { registerMicroApps, start } from 'qiankun'
import './style.scss'

function MicroPage() {
  useEffect(() => {
    registerMicroApps([
      {
        name: 'vueApp',
        entry: '//localhost:8080',
        container: '#container',
        activeRule: '/app-vue',
      },
    ])
    start()
  }, [])
  return <div id="container" />
}

export default MicroPage
