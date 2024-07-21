import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Dropdown,
  Menu,
  MenuProps,
  Modal,
  Form,
  Input,
  message,
  Typography,
} from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import storage from '@/utils/storage'
import { USER_AUTH_TOKEN, USER_INFO } from '@/constant'
import User from '@/api/user'

const { Text } = Typography

function UserInfo() {
  const history = useHistory()
  const [updateVisible, setUpdateVisible] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  const initialValues = () => ({
    name: storage.get(USER_INFO).name,
    email: storage.get(USER_INFO).email,
  })

  const [form] = Form.useForm()

  const logout = () => {
    storage.remove(USER_AUTH_TOKEN)
    storage.remove(USER_INFO)
    history.push('/login')
  }

  const handleLogoff = () => {
    User.deleteMe().then(() => {
      message.success('删除用户成功')
      logout()
    })
  }

  const menuMethods: any = {
    logout,
    update: () => {
      setUpdateVisible(true)
    },
    logoff: () => {
      Modal.confirm({
        content: '是否确认注销用户',
        okText: '确认',
        cancelText: '取消',
        onOk: handleLogoff,
      })
    },
  }

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    menuMethods[key]()
  }

  const onFinish = (value: any) => {
    setUpdateLoading(true)
    User.update(value)
      .then((res) => {
        storage.set(USER_INFO, res.data.user)
        message.success('更新用户信息成功')
        setUpdateVisible(false)
      })
      .finally(() => setUpdateLoading(false))
  }

  return (
    <>
      <Dropdown
        overlay={
          <Menu
            onClick={handleClick}
            items={[
              { key: 'logout', label: '退出登录' },
              { key: 'update', label: '修改信息' },
              { key: 'logoff', label: <Text type="danger">注销用户</Text> },
            ]}
          />
        }
        placement="bottom"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          {storage.get(USER_INFO).name}
          <MenuOutlined style={{ float: 'right' }} />
        </div>
      </Dropdown>
      <Modal
        visible={updateVisible}
        centered
        okText="确认"
        cancelText="取消"
        destroyOnClose
        confirmLoading={updateLoading}
        onOk={() => form.submit()}
        onCancel={() => setUpdateVisible(false)}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          preserve={false}
          autoComplete="off"
          initialValues={initialValues()}
        >
          <Form.Item
            label="用户名"
            name="name"
            required
            rules={[{ required: true, message: '用户名不能为空' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            required
            rules={[{ required: true, message: '邮箱不能为空' }]}
          >
            <Input placeholder="请输入邮箱地址" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default UserInfo
