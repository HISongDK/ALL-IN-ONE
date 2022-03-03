import React, { useEffect } from 'react'
import { loadMicroApp } from 'qiankun'
import microApps from '@/micro'

function Vue3() {
  useEffect(() => {
    const microApp = loadMicroApp(microApps[1])
    return () => {
      microApp.unmount()
    }
  }, [])
  return <div id="vue3" />
}

export default Vue3
