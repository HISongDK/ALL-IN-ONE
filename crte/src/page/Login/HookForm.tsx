import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button } from 'tea-component'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import service from '../../api'
import './hookForm.scss'

interface IFormInput {
  username: string
  password: string
}

function HookForm(): ReactElement {
  const {
    control,
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors, isValidating },
  } = useForm<IFormInput>({
    mode: 'all',
  })

  const history = useHistory()

  // 表单提交处理函数
  const onSubmit: SubmitHandler<IFormInput> = async (val: any) => {
    const res = await service.post('/api/login', val)
    // eslint-disable-next-line no-console
    console.log(res)
    if (res.data.code === 200) {
      localStorage.setItem('token', res.data.token)
      history.push('/')
    }
  }
  return (
    <div className="my-login__hook-form">
      <p className="my-login__text">登录页</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{
              validate: () => {
                // return !value || value.length < 4 ? '用户名太短了哦' : undefined
                return undefined // 不做校验
              },
            }}
            render={({ field }) => (
              <Form.Item
                label="用户名"
                required
                // status={isValidating ? 'validating' : getStatus(meta)}
                message={errors.username?.message}
              >
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="请输入用户名"
                />
              </Form.Item>
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              validate: () => {
                // return !value || value.length < 4 ? '密码太短了哦' : undefined
                return undefined // 不校验
              },
            }}
            render={({ field }) => (
              <Form.Item
                label="密码"
                required
                // status={isValidating ? 'validating' : getStatus(meta)}
                message={errors.password?.message}
              >
                <Input {...field} autoComplete="off" placeholder="请输入密码" />
              </Form.Item>
            )}
          />
        </Form>
        <Button type="primary" htmlType="submit" style={{ marginTop: '30px' }}>
          确认登录
        </Button>
      </form>
    </div>
  )
}

export default HookForm
