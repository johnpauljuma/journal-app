"use client";

import React, { useState, useEffect } from 'react';
import {
  DatabaseOutlined, 
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  PlusOutlined,
  EyeOutlined,
  HomeOutlined,
  SnippetsOutlined,
  FieldTimeOutlined,
  CarryOutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import MyCalendar from './MyCalender';
import MyTimeline from './MyTimeline';
import DailyReflections from './DailyReflections';
import DailyTasks from './DailyTasks';
import Goals from './Goals';
import Journal from './Journal';
import './styles.css'; // Import custom styles

const { Header, Sider, Content, Footer } = Layout;

const RootLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('');
  const [isJournalView, setIsJournalView] = useState(false); // New state to toggle Journal view

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuItemClick = (key) => {
    if (key === '2' || key === 'journal-landing' || key === 'daily-reflection' || key === 'goals' || key === 'daily-tasks') {
      setIsJournalView(true);
    } else {
      setIsJournalView(false);
    }
    setSelectedKey(key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return children;
      case '2':
        return renderJournalContent(); // Render Journal content
      case '3':
        return <MyTimeline />;
      case '4':
        return <MyCalendar />;
      case 'journal-landing':
        return <Journal />
      case 'daily-reflection':
        return <DailyReflections />;
      case 'goals':
        return <Goals />;
      case 'daily-tasks':
        return <DailyTasks />
      default:
        return children; // Fallback to children
    }
  };

  const renderJournalContent = () => (
    <Journal />
  );

  useEffect(() => {
    setSelectedKey(''); // Ensure that the selectedKey is empty on mount to show the children content by default
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          paddingLeft: "20px",
          paddingBottom: "10px",
          background: "#fff",
          textAlign: 'left',
          color: '#fff',
          display: "flex",
          position: 'fixed',
          width: '100%',
          zIndex: 1000
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
            display: "inline",
            marginLeft: "10em"
          }}
        />
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h1
            style={{
              margin: "0",
              alignSelf: 'center',
            }}>
            My Journal
          </h1>
        </div>
        {isJournalView && (
          <div style={{ position: 'absolute', right: '20px' }}>
            <Button className='custom-menu-item' type="primary" icon={<EyeOutlined />}>Diaries</Button>
            <Button className='custom-menu-item' type="primary" icon={<EyeOutlined />} style={{ marginLeft: '10px' }}>Goals</Button>
            <Button className='custom-menu-item' type="primary" icon={<EyeOutlined />} style={{ marginLeft: '10px' }}>Tasks</Button>
            <Button className='custom-menu-item' type="primary" icon={<PlusOutlined />} style={{ marginLeft: '10px' }}>Add</Button>
          </div>
        )}
      </Header>
      <Layout style={{ marginTop: '64px', color: 'white' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}
          style={{
            background: "#c04b10",
            color: "#fff",
            fontSize: '50pt',
            textEmphasis: 'bold',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: '64px',
            zIndex: 1000,
            overflow: 'auto'
          }}>
          <Menu
            theme="none"
            mode="inline"
            defaultSelectedKeys={['']}
            items={isJournalView ? [
              {
                key: 'home',
                icon: <HomeOutlined style={{fontSize:'14pt'}}/>,
                label: 'Home',
                onClick: () => {
                  setIsJournalView(false);
                  setSelectedKey('1');
                },
                className: 'custom-menu-item' // Apply custom CSS class
              },
              {
                key: 'journal-landing',
                icon: <SnippetsOutlined style={{fontSize:'14pt'}}/>,
                label: 'Journals',
                className: 'custom-menu-item' // Apply custom CSS class
              },
              {
                key: 'daily-reflection',
                icon: <DatabaseOutlined style={{fontSize:'14pt'}}/>,
                label: 'Daily Reflection',
                className: 'custom-menu-item' // Apply custom CSS class
              },
              {
                key: 'goals',
                icon: <CarryOutOutlined style={{fontSize:'14pt'}}/>,
                label: 'Goals',
                className: 'custom-menu-item' // Apply custom CSS class
              },
              {
                key: 'daily-tasks',
                icon: <DatabaseOutlined style={{fontSize:'14pt'}}/>,
                label: 'Daily Tasks',
                className: 'custom-menu-item' // Apply custom CSS class
              }
            ] : [
              {
                key: '1',
                icon: <HomeOutlined style={{fontSize:'14pt'}}/>,
                label: 'Home',
                className: 'custom-menu-item' // Apply custom CSS class
              },
              {
                key: '2',
                icon: <SnippetsOutlined style={{fontSize:'14pt'}}/>,
                label: 'Journals',
                className: 'custom-menu-item' // Apply custom CSS class
              },
              {
                key: '3',
                icon: <FieldTimeOutlined style={{fontSize:'14pt'}}/>,
                label: 'Timeline',
                className: 'custom-menu-item' // Apply custom CSS class
              },
              {
                key: '4',
                icon: <UserOutlined style={{fontSize:'14pt'}}/>,
                label: 'Calendar',
                className: 'custom-menu-item' // Apply custom CSS class
              },
            ]}
            onClick={({ key }) => handleMenuItemClick(key)}
          />
        </Sider>
        <Layout style={{ marginLeft: collapsed ? '80px' : '200px', transition: 'margin-left 0.2s' }}>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: '#e18437',
              borderRadius: '10px',
              overflowY: 'auto',
              height: 'calc(100vh - 64px - 70px)' // Adjust height to account for header and footer
            }}
          >
            {renderContent()}
          </Content>
          <Footer
            style={{
              textAlign: 'center',
              width: '100%',
              background: "#fff",
              position: 'fixed',
              bottom: 0,
              left: 0,
              height: '70px',
              zIndex: 1000
            }}
          >
            Ant Design ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
