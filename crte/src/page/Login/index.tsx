import React from 'react'
import { Redirect } from 'react-router-dom'
import { useLocalStorage } from '@utils/hooks'
import HookForm from './HookForm'
import routes from '@/router'
import './style.less'

function Login() {
  const [userToken] = useLocalStorage('userToken')

  if (userToken?.expires > Date.now()) {
    return <Redirect to={routes[0].path} />
  }

  return (
    <div className="my-login__bg">
      <HookForm />
    </div>
  )
}

export default Login
