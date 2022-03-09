import React, { useEffect } from 'react'
import { registerMicroApps, start } from 'qiankun'
import { Route, Link, useHistory, Redirect } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Switch, Row } from 'antd'
import { SmileOutlined, SmileTwoTone } from '@ant-design/icons'
import { useBreadcrumbs } from '@utils/hooks'
import microApps from './micro'
import routes from './router/index'

const { Header, Sider, Content } = Layout

// 构建路由
const genRoutes = () => (
  <>
    {routes.map((route) => (
      <Route key={route.path} path={route.path} component={route.component} />
    ))}
    <Redirect to={routes[routes.length - 1].path} />
  </>
)

function App() {
  const history = useHistory()

  useEffect(() => {
    registerMicroApps(microApps)
    start()
  }, [])

  const changeTheme = (checked: boolean) => {
    const root = document.documentElement
    if (checked) {
      root.className = 'light'
    } else {
      root.className = 'dark'
    }
  }

  const breadcrumb = useBreadcrumbs()

  return (
    <Layout>
      <Header className="header">
        <Row justify="space-between" align="middle">
          <div className="logo">微前端初试</div>
          <Switch
            checkedChildren={<SmileTwoTone />}
            unCheckedChildren={<SmileOutlined />}
            defaultChecked
            onChange={changeTheme}
          />
        </Row>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            {routes.map(({ path, icon, name }) => (
              <Menu.Item
                key={path}
                icon={icon}
                onClick={() => history.push(path)}
              >
                {name}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {/* 正常来说该是获取的面包屑路由数组，不过现在没层级路由 */}
            <Breadcrumb.Item>
              <Link to={breadcrumb.path}>{breadcrumb.name}</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {genRoutes()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
