import React from 'react'
import { Redirect } from 'react-router-dom'
import { useLocalStorage } from '@/utils/hooks'
import HookForm, { HookFormType } from './HookForm'
import routes from '@/router'
import './style.less'

function Register() {
  // const [userToken] = useLocalStorage('userToken')

  // if (userToken?.expires > Date.now()) {
  //   return <Redirect to={routes[0].path} />
  // }

  return (
    <div className="my-login__bg">
      <HookForm type={HookFormType.Register} />
    </div>
  )
}

export default Register
