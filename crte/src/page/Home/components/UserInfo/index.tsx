import React, { useState } from 'react'
import { Dropdown, Menu, MenuProps, Modal, Form, Input } from 'antd'
import { MenuOutlined } from '@ant-design/icons'

function UserInfo() {
  const [updateVisible, setUpdateVisible] = useState(false)

  const [form] = Form.useForm()

  const menuMethods: any = {
    logout: () => {
      console.log('logout')
    },
    update: () => {
      setUpdateVisible(true)
    },
  }

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    menuMethods[key]()
  }

  const onSubmit = (value: any) => {
    console.log(value)
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
            ]}
          />
        }
        placement="bottom"
      >
        <MenuOutlined style={{ float: 'right' }} />
      </Dropdown>
      <Modal
        visible={updateVisible}
        centered
        okText="确认"
        cancelText="取消"
        destroyOnClose
        onOk={() => form.submit()}
        onCancel={() => setUpdateVisible(false)}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
          autoComplete="off"
          preserve={false}
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
