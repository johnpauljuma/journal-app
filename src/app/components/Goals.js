"use client";

import React from 'react';
import { Form, Input, Button, Card, DatePicker, Upload, Row, Col } from 'antd';
import moment from 'moment';

const Goals = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // Function to disable past dates
  const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'fitContent' }}>
      <Card
        title="Set a New Goal"
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
                label="Goal"
                name="title"
                rules={[{ required: true, message: 'Please input your goal!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Achieveable By:"
                name="date"
                rules={[{ required: true, message: 'Please select the due date!' }]}
              >
                <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Goal Description"
                name="description"
                rules={[{ required: true, message: 'Please input your your goal description!' }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
            
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ display: 'block', float:'right' }}>
              Set
            </Button>
          </Form.Item>
        </Form>
      </Card>
      
    </div>
  );
};

export default Goals;
