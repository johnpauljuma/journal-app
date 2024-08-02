"use client";

import React, { useState, useEffect } from 'react';
import { Card, List, Button, message, Modal, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Diaries = () => {
  const [diaries, setDiaries] = useState([]);
  const [editingDiary, setEditingDiary] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await fetch('/api/dailyReflections');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDiaries(data);
      } catch (error) {
        message.error('Failed to load diaries.');
      }
    };

    fetchDiaries();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/dailyReflections`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setDiaries(diaries.filter(diary => diary.id !== id));
        message.success('Diary deleted successfully');
      } else {
        throw new Error('Failed to delete diary');
      }
    } catch (error) {
      message.error('Failed to delete diary.');
    }
  };

  const handleEdit = (diary) => {
    setEditingDiary(diary);
    form.setFieldsValue({
      title: diary.title,
      date: diary.date,
      description: diary.description,
      imagePath: diary.imagePath,
    });
  };

  const handleEditSave = async (values) => {
    try {
      const response = await fetch(`/api/dailyReflections`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...editingDiary, ...values }),
      });

      if (response.ok) {
        const updatedDiary = await response.json();
        const updatedDiaries = diaries.map(diary =>
          diary.id === editingDiary.id ? updatedDiary : diary
        );
        setDiaries(updatedDiaries);
        setEditingDiary(null);
        message.success('Diary updated successfully');
        
      } else {
        throw new Error('Failed to update diary');
      }
    } catch (error) {
      message.error('Failed to update diary.');
    }
  };

  const handleEditCancel = () => {
    setEditingDiary(null);
    form.resetFields();
  };

  const handleUploadChange = (info) => {
    if (info.file.status === 'done') {
      const file = info.file.originFileObj;
      const reader = new FileReader();
      reader.onload = () => {
        form.setFieldsValue({ imagePath: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div style={{ padding: '24px', marginBottom:'60px' }}>
      <h2 style={{margin:'0', color:'white', marginBottom:'10px'}}>My Diaries</h2>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={diaries}
        renderItem={item => (
          <List.Item>
            <Card
              title={item.title}
              extra={
                <>
                  <Button type="default" onClick={() => handleEdit(item)} style={{ marginRight: 8 }}>
                    Edit
                  </Button>
                  <Button type="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
                </>
              }
            >
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                {item.imagePath && (
                  <div style={{ marginRight: '16px' }}>
                    <img 
                      src={item.imagePath} 
                      alt={item.title} 
                      style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </div>
                )}
                <div>
                  <p><strong>Date:</strong> {item.date}</p>
                  <p>{item.description}</p>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title="Edit Diary"
        visible={!!editingDiary}
        onCancel={handleEditCancel}
        footer={null}
      >
        {editingDiary && (
          <Form
            form={form}
            initialValues={{
              title: editingDiary.title,
              date: editingDiary.date,
              description: editingDiary.description
            }}
            onFinish={handleEditSave}
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please enter the title' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: 'Please enter the date' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter the description' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="imagePath"
              label="Image"
            >
              <Upload
                beforeUpload={() => false}
                onChange={handleUploadChange}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
              {editingDiary.imagePath && (
                <div style={{ marginTop: '10px' }}>
                  <img 
                    src={editingDiary.imagePath} 
                    alt="Current"
                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button type="default" onClick={handleEditCancel} style={{ marginLeft: 8 }}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default Diaries;
