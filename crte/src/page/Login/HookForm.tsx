import React, { ReactElement } from 'react'
import { Form, Input, Button } from 'tea-component'
import './hookForm.scss'

import { useForm, Controller, SubmitHandler } from 'react-hook-form'

interface IFormInput {
  username: string
  password: string
}

function HookForm(): ReactElement {
  const { control, handleSubmit, formState } = useForm<IFormInput>({
    mode: 'all',
  })

  // 表单提交处理函数
  const onSubmit: SubmitHandler<IFormInput> = (val: any) => {
    console.log(val)
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
              validate: (value) => {
                return !value || value.length < 4 ? '昵称太短了哦' : undefined
              },
            }}
            render={({ field }) => (
              <Form.Item
                label="用户名"
                // status={formState.isValidating ? 'validating' : getStatus(meta)}
                // message={errors.name?.message}
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
              validate: (value) => {
                return !value || value.length < 4 ? '昵称太短了哦' : undefined
              },
            }}
            render={({ field }) => (
              <Form.Item
                label="密码"
                // status={formState.isValidating ? 'validating' : getStatus(meta)}
                // message={errors.name?.message}
              >
                <Input {...field} autoComplete="off" placeholder="请输入密码" />
              </Form.Item>
            )}
          />
        </Form>
      </form>

      <Button type="primary" style={{ marginTop: '30px' }}>
        确认登录
      </Button>
    </div>
  )
}

export default HookForm
