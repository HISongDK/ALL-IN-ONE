import React, { useEffect } from 'react'
import { registerMicroApps, start } from 'qiankun'
import { Route, useHistory } from 'react-router-dom'
import { Layout, Button, Menu, Breadcrumb } from 'antd'
import { UserOutlined, LaptopOutlined } from '@ant-design/icons'
import microApps from './micro'
import routes from './router/index'

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu

function App() {
  const history = useHistory()

  useEffect(() => {
    registerMicroApps(microApps)
    start()
  }, [])

  const changeTheme = () => {
    const root = document.documentElement
    const domCls = root.className
    if (domCls.includes('dark')) {
      root.className = 'light'
    } else {
      root.className = 'dark'
    }
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
              <Menu.Item key="1">option1</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
              <Menu.Item key="5">option5</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
              />
            ))}
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
