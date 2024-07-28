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
  EyeOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Card, Row, Col } from 'antd';
import MyCalendar from './MyCalender'; 
import MyTimeline from './MyTimeline';
import DailyReflections from './DailyReflections';
import DailyTasks from './DailyTasks';
import Goals from './Goals';
import Journal from './Journal';

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
    <Journal/>
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
          background: "#DE3163",
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
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
            <Button type="primary" icon={<EyeOutlined />}>Diaries</Button>
            <Button type="primary" icon={<EyeOutlined />} style={{ marginLeft: '10px' }}>Goals</Button>
            <Button type="primary" icon={<EyeOutlined />} style={{ marginLeft: '10px' }}>Tasks</Button>
            <Button type="primary" icon={<PlusOutlined />} style={{ marginLeft: '10px' }}>Add</Button>
          </div>
        )}
      </Header>
      <Layout style={{ marginTop: '64px' }}>
        <Sider trigger={null} collapsible collapsed={collapsed} 
          style={{
            background: "#000080",
            color: "white",
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: '64px',
            zIndex: 1000,
            overflow: 'auto'
          }}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['']}
            items={isJournalView ? [
              {
                key: 'home',
                icon: <DatabaseOutlined />,
                label: 'Home',
                onClick: () => {
                  setIsJournalView(false);
                  setSelectedKey('1');
                }
              },
              {
                key: 'journal-landing',
                icon: <DatabaseOutlined />,
                label: 'Journals',
              },
              {
                key: 'daily-reflection',
                icon: <DatabaseOutlined />,
                label: 'Daily Reflection',
              },
              {
                key: 'goals',
                icon: <DatabaseOutlined />,
                label: 'Goals',
              },
              {
                key: 'daily-tasks',
                icon: <DatabaseOutlined />,
                label: 'Daily Tasks',
              }
            ] : [
              {
                key: '1',
                icon: <DatabaseOutlined />,
                label: 'Home',
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: 'Journals',
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: 'Timeline',
              },
              {
                key: '4',
                icon: <UserOutlined />,
                label: 'Calendar',
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
              background: colorBgContainer,
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
              background: "#E6E6FA",
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
