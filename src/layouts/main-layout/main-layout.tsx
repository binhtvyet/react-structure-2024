import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppstoreOutlined,
  LogoutOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {  Breadcrumb, Button, Layout, Menu, Popover, theme } from 'antd';

// configs
import { PAGE_URL } from '../../config/page-url';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];


const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  function logout() {
    window.localStorage.clear();
    navigate(PAGE_URL.LOGIN);
  }

  const items: MenuItem[] = [
    {
      key: '1',
      icon: <MailOutlined />,
      label: (
        <div onClick={() => navigate(PAGE_URL.ROOT)}>
          Dashboard
        </div>
      ),
    },
    {
      key: '2',
      icon: <AppstoreOutlined />,
      label: 'Product',
      children: [
        { key: '21',  label: (
          <div onClick={() => navigate(PAGE_URL.PRODUCT)}>
            Product List
          </div>
        ), },
      ],
    },
  ];
  const popoverItems: MenuItem[] = [
    {
      key: '1',
      icon: <LogoutOutlined />,
      label: (
        <div style={{ color: 'black' }} onClick={logout}>
          Logout
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', background: colorBgContainer, textAlign: 'right' }}>
          <Popover 
            placement="bottomRight" 
            arrow={{ pointAtCenter: true }}
            trigger={'click'}
            content={
              <Menu
                mode="inline"
                style={{ width: 300 }}
                items={popoverItems}
              />
            } 
          >
            <Button shape="circle" icon={<UserOutlined />} />
          </Popover>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;