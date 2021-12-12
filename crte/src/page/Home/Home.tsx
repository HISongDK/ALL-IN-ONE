import React, { ReactElement, useState, Fragment } from 'react'
import { NavLink, Link, Routes, Route, BrowserRouter } from 'react-router-dom'
import routesConfig from '../../router/config'

import { Layout, Card, Text, ExternalLink, Menu, NavMenu } from 'tea-component'
import Button from '../Button/Button'

const { Header, Body, Footer, Sider, Content } = Layout

const icon: [string, string] = /** @type {[string, string]} */ [
  `https://via.placeholder.com/16.png?text=icon`,
  `https://via.placeholder.com/16/006eff/444444`,
]

export default function Home() {
  const [selected, setSelected] = useState('overview')

  const getMenuItemProps = (id: string) => ({
    selected: selected === id,
    onClick: () => setSelected(id),
  })

  return (
    <Layout className="demo-layout-l">
      <Header>
        <NavMenu
          left={
            <>
              <NavMenu.Item type="logo">
                <img
                  src="https://via.placeholder.com/32.png?text=LOGO"
                  alt="logo"
                />
              </NavMenu.Item>
              <NavMenu.Item>总览</NavMenu.Item>
            </>
          }
        />
      </Header>
      <Body>
        <Sider>
          <Menu
            collapsable
            theme="dark"
            title="产品名称"
            icon="https://via.placeholder.com/32.png?text=icon"
          >
            <Menu.Item
              icon={icon}
              title="一级菜单"
              {...getMenuItemProps('1')}
            />

            <Menu.SubMenu defaultOpened title="一级菜单" icon={icon}>
              <Menu.Item title="二级菜单" {...getMenuItemProps('2-1')} />
              <Menu.Item title="二级菜单" {...getMenuItemProps('2-2')} />
              {routesConfig.map((route) => (
                <Menu.Item
                  title={route.title}
                  render={() => <Link to={route.path}></Link>}
                ></Menu.Item>
              ))}
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Content>
          <Content.Header
            showBackButton
            onBackButtonClick={console.log}
            title="内容标题"
            subtitle={
              <>
                说明文字 <Text theme="label">带颜色说明文字</Text>
              </>
            }
            operation={<ExternalLink weak>内容帮助</ExternalLink>}
          />
          <Content.Body>
            {/* 内容区域一般使用 Card 组件显示内容 */}
            <Card>
              <Card.Body>内容卡片</Card.Body>
              <Fragment>
                <Routes>
                  {routesConfig.map((route) => (
                    <Route path={route.path} element={Button}></Route>
                  ))}
                </Routes>
              </Fragment>
            </Card>
          </Content.Body>
          <Content.Footer>
            <div className="demo-layout-footer">
              (可选项)自定义页脚
              <br />
              京公网安备 11010802017518 粤B2-20090059-1
            </div>
          </Content.Footer>
        </Content>
      </Body>
      <Footer style={{ textAlign: 'center' }}>
        <div className="demo-layout-footer">
          (可选项)自定义页脚
          <br />
          京公网安备 11010802017518 粤B2-20090059-1
        </div>
      </Footer>
    </Layout>
  )
}
