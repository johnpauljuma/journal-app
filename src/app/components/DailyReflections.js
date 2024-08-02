"use client";

import React, { useState } from 'react';
import { Form, Input, Button, Card, DatePicker, Row, Col, message } from 'antd';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';

const DailyReflections = () => {
  const [form] = Form.useForm();
  const [imagePath, setImagePath] = useState('');

  const onFinish = async (values) => {
    const formData = {
      title: values.title,
      date: values.date ? values.date.format('YYYY-MM-DD') : '',
      description: values.description,
      imagePath,
    };

    const url = '/api/dailyReflections';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        message.success('Reflection submitted successfully!');
        form.resetFields();
        setImagePath('');
      } else {
        message.error('Failed to submit reflection');
      }
    } catch (error) {
      message.error('An error occurred while submitting the reflection');
      console.error(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImagePath(data.filePath); // Assuming the API returns the file path
        message.success('Image uploaded successfully!');
      } else {
        message.error('Failed to upload image');
      }
    } catch (error) {
      message.error('An error occurred while uploading the image');
      console.error(error);
    }
  };

  const disabledDate = (current) => {
    return current && current > moment().startOf('day');
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'fitContent', padding: '20px' }}>
      <Card
        title="New Diary"
        style={{ width: '100%', maxWidth: '800px', marginBottom: '10px' }}
      >
        <Form
          form={form}
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
                <DatePicker disabledDate={disabledDate} style={{ width: '100%' }} />
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
              <Form.Item label="Visualize Your Reflection">
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="fileInput" style={labelStyle}>
                <UploadOutlined style={{ marginRight: '8px' }} />
                  Upload Image
                </label>
                {imagePath && <p>Image uploaded: {imagePath}</p>}
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ display: 'block', marginLeft: 'auto', backgroundColor:'#c04b10', fontWeight:'bold', }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
const labelStyle = {
  display: 'inline-block',
  padding: '6px 12px',
  cursor: 'pointer',
  backgroundColor: '#c04b10',
  color: '#fff',
  borderRadius: '4px',
  textAlign: 'center',
  
};
export default DailyReflections;
