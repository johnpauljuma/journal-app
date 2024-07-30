"use client";

import React from 'react';
import { Form, Input, Button, Card, DatePicker, Row, Col, message } from 'antd';
import moment from 'moment';

const Goals = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const formData = {
      title: values.title,
      targetDate: values.date ? values.date.format('YYYY-MM-DD') : '',
      description: values.description,
    };

    try {
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        message.success('Goal set successfully!');
        form.resetFields();
      } else {
        message.error('Failed to set goal');
      }
    } catch (error) {
      message.error('An error occurred while setting the goal');
      console.error(error);
    }
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
          form={form}
          name="goal_form"
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
                label="Achievable By:"
                name="date"
                rules={[{ required: true, message: 'Please select the due date!' }]}
              >
                <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Goal Description"
            name="description"
            rules={[{ required: true, message: 'Please input your goal description!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ display: 'block', float: 'right' }}>
              Set
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Goals;
