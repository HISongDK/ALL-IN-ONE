import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import Request from '@api/index'
import './hookForm.scss'

interface IFormInput {
  username: string
  password: string
}

function HookForm(): ReactElement {
  const history = useHistory()

  // 表单提交处理函数
  const onFinish = async (values: IFormInput) => {
    const res = await Request.login(values)

    if (res.code === 200) {
      sessionStorage.setItem('token', '已登录')
      message.success(res.msg, 0.5)
      setTimeout(() => {
        history.push('/')
      }, 500)
    } else {
      message.error(res.msg)
    }
  }

  return (
    <div className="my-login__hook-form">
      <p className="my-login__text">登录</p>
      <Form
        autoComplete="off"
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item
          required
          name="username"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          required
          name="password"
          label="密&emsp;码"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input placeholder="请输入密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            确认登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default HookForm
