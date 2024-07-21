import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { useLocalStorage } from '@/utils/hooks'
import HookForm, { HookFormType } from './HookForm'
import routes from '@/router'
import './style.less'

function Login() {
  const [userToken] = useLocalStorage('userToken')
  const location = useLocation()
  console.log('---  location  ---\n', location)

  if (userToken?.expires > Date.now()) {
    return <Redirect to={routes[0].path} />
  }

  const { email } = (location.state as { email?: string }) || {}

  return (
    <div className="my-login__bg">
      <HookForm type={HookFormType.Login} email={email} />
    </div>
  )
}

export default Login
