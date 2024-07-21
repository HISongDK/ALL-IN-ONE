import React, { ReactElement, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import Auth from '@/api/auth'
// import { useLocalStorage } from '@/utils/hooks'
import './hookForm.scss'
import { SUCCESS, USER_AUTH_TOKEN, USER_INFO } from '@/constant'
import storage from '@/utils/storage'
import { validatePassword } from './utils'

interface IFormInput {
  username: string
  password: string
}

export enum HookFormType {
  Login = 1,
  Register = 2,
}

type THookFormProps = { type: HookFormType; email?: string }

function HookForm({ type, email }: THookFormProps): ReactElement {
  const history = useHistory()
  // const [_, setUser] = useLocalStorage('userToken')
  const [isSaveSeven, setIsSaveSeven] = useState(false)

  const [form] = useForm()

  const isLogin = type === HookFormType.Login

  // 表单提交处理函数
  const onFinish = async (values: IFormInput) => {
    // 登录
    if (isLogin) {
      const res = await Auth.login(values)
      if (res) {
        storage.set(USER_AUTH_TOKEN, res.token)
        storage.set(USER_INFO, res.data.user)
      }
      history.push('/')

      return
    }

    // 注册
    const res = await Auth.register({
      ...values,
      passwordConfirm: values.password,
    })

    if (res.status === SUCCESS) {
      message.success('注册成功')
      history.push('/login', { email: res.data?.user?.email })
    } else {
      message.error(res.message)
    }
  }

  const handleUsernameBlur = (e: any) => {
    form.setFieldValue('name', e.target.value.trim())
  }

  return (
    <div className="my-login__hook-form">
      <p className="my-login__text">{isLogin ? '登录' : '注册'}</p>
      <Form
        form={form}
        initialValues={{ email }}
        autoComplete="off"
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        {!isLogin && (
          <Form.Item
            required
            name="name"
            label="用户名"
            rules={[
              { required: true, message: '请输入用户名' },
              { whitespace: true, message: '请输入用户名' },
              { max: 20, message: '用户名应在20个字符以内' },
            ]}
          >
            <Input placeholder="请输入用户名" onBlur={handleUsernameBlur} />
          </Form.Item>
        )}

        <Form.Item
          required
          name="email"
          label="邮&emsp;箱"
          rules={[{ required: true, message: '请输入邮箱' }]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item
          required
          name="password"
          label="密&emsp;码"
          rules={[
            { required: true, message: '请输入密码' },
            {
              // eslint-disable-next-line prefer-regex-literals
              pattern: new RegExp('^[^\\s]*$'),
              message: '密码不能包含空格',
            },
            { validator: validatePassword },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item>
          <div className="form-footer">
            {/* <Checkbox
              checked={isSaveSeven}
              style={{ color: '#fff' }}
              onChange={(e) => setIsSaveSeven(e.target.checked)}
            >
              七天免登录
            </Checkbox> */}

            {isLogin ? (
              <Link to="/register">暂无账号，前往注册</Link>
            ) : (
              <Link to="/login">已有账号，前往登录</Link>
            )}

            <Button type="primary" htmlType="submit">
              确认{isLogin ? '登录' : '注册'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default HookForm
