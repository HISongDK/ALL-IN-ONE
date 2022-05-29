import React, { ReactElement, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, message, Checkbox } from 'antd'
import dayjs from 'dayjs'
import Request from '@api/index'
import { useLocalStorage } from '@/utils/hooks'
import './hookForm.scss'

interface IFormInput {
  username: string
  password: string
}

function HookForm(): ReactElement {
  const history = useHistory()
  const [_, setUser] = useLocalStorage('userToken')
  const [isSaveSeven, setIsSaveSeven] = useState(false)

  // 表单提交处理函数
  const onFinish = async (values: IFormInput) => {
    const res = await Request.login(values)

    if (res.code === 200) {
      if (isSaveSeven) {
        setUser({
          user: res.data._id,
          expires: dayjs().add(7, 'day').valueOf(),
        })
      } else {
        setUser({
          user: res.data._id,
          expires: dayjs().add(1, 'day').valueOf(),
        })
      }

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
          <div className="form-footer">
            <Checkbox
              checked={isSaveSeven}
              style={{ color: '#fff' }}
              onChange={(e) => setIsSaveSeven(e.target.checked)}
            >
              七天免登录
            </Checkbox>
            <Button type="primary" htmlType="submit">
              确认登录
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default HookForm
