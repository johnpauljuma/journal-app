"use client";

import React from 'react';
import { Form, Input, Button, Card, DatePicker, Upload, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const DailyReflections = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'fitContent' }}>
      <Card
        title="New Diary"
        style={{ width: '100%', maxWidth: '600px', marginBottom: '10px' }}
      >
        <Form
          name="daily_reflections"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please input your reflection title!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: 'Please select the date!' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input your reflection!' }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Visualize Your Reflection"
                name="image"
              >
                <Upload>
                  <Button icon={<UploadOutlined />}>Upload an Image</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ display: 'block', float:'right' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
      
    </div>
  );
};

export default DailyReflections;
