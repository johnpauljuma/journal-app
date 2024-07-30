"use client";

import React, { useState, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Modal } from 'antd';
import moment from 'moment';

const TaskForm = ({ task, index, editIndex, form, handleSave, handleEdit, handleDone, handleRemove, onCancelEdit }) => (
  <Card
    size="small"
    key={index}
    title={
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{moment().format('YYYY-MM-DD')}</span>
        <span>{`Item ${index + 1}`}</span>
        <CloseOutlined onClick={() => handleRemove(index)} style={{ marginLeft: '10px' }} />
      </div>
    }
  >
    <Form.Item
      label="Task"
      name={[index, 'task']}
      initialValue={task.task}
      rules={[{ required: true, message: 'Please input the task!' }]}
    >
      <Input disabled={editIndex !== index && task.saved} />
    </Form.Item>
    <Form.Item
      label="Description"
      name={[index, 'description']}
      initialValue={task.description}
    >
      <Input.TextArea rows={2} disabled={editIndex !== index && task.saved} />
    </Form.Item>
    <Form.Item>
      {editIndex === index ? (
        <div>
          <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
            Save
          </Button>
          <Button type="default" onClick={onCancelEdit} style={{ marginRight: 8 }}>
            Cancel
          </Button>
        </div>
      ) : task.saved ? (
        <div>
          <Button type="default" onClick={() => handleDone(index)} style={{ marginRight: 8 }}>
            Done
          </Button>
          <Button type="default" onClick={() => handleEdit(index)}>
            Edit
          </Button>
        </div>
      ) : (
        <Button type="primary" onClick={() => handleSave(index)}>
          Save
        </Button>
      )}
    </Form.Item>
  </Card>
);

const DailyTasks = () => {
  const [form] = Form.useForm();
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem('dailyTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem('dailyTasks', JSON.stringify(updatedTasks));
  };

  const handleAddTask = () => {
    setTasks([...tasks, { task: '', description: '', done: false, saved: false }]);
  };

  const handleSave = (index) => {
    form.validateFields([index, 'task', index, 'description'])
      .then(() => {
        setTasks((prevTasks) => {
          const newTasks = [...prevTasks];
          newTasks[index].saved = true;
          saveTasksToLocalStorage(newTasks);
          return newTasks;
        });
        message.success('Task saved locally!');
      })
      .catch(() => {
        message.error('Please fill in the required fields before saving.');
      });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    form.setFieldsValue(tasks[index]);
  };

  const handleDone = async (index) => {
    Modal.confirm({
      title: 'Save task?',
      content: 'Would you like to save this task for future reference?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        const task = tasks[index];
        try {
          const response = await fetch('/api/dailyTasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify([task]),
          });
          if (response.ok) {
            message.success('Task saved to server!');
            handleRemove(index);
          } else {
            message.error('Failed to save task to server');
          }
        } catch (error) {
          message.error('An error occurred while saving the task');
          console.error(error);
        }
      },
      onCancel: () => handleRemove(index),
    });
  };

  const handleRemove = (index) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.filter((_, i) => i !== index);
      saveTasksToLocalStorage(newTasks);
      return newTasks;
    });
    message.info('Task removed');
  };

  const onFinish = (values) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks[editIndex] = { ...values, done: false, saved: true };
      saveTasksToLocalStorage(newTasks);
      return newTasks;
    });
    setEditIndex(null);
    message.success('Task updated!');
  };

  const onCancelEdit = () => {
    setEditIndex(null);
  };

  return (
    <div>
      <div style={{ padding: '5px', justifyContent: 'center', display: 'flex' }}>
        <h1>What would you Love to Accomplish Today</h1>
      </div>
      <div style={{ padding: '5px', justifyContent: 'center', position: 'relative' }}>
        <center>
          <Form
            form={form}
            name="daily_tasks"
            style={{ maxWidth: 900, margin: 0, boxShadow: 5 }}
            autoComplete="off"
            onFinish={onFinish}
          >
            {tasks.map((task, index) => (
              <TaskForm
                key={index}
                task={task}
                index={index}
                editIndex={editIndex}
                form={form}
                handleSave={handleSave}
                handleEdit={handleEdit}
                handleDone={handleDone}
                handleRemove={handleRemove}
                onCancelEdit={onCancelEdit}
              />
            ))}
            <Button type="dashed" onClick={handleAddTask} block style={{ marginBottom: '40px' }}>
              + Add Item
            </Button>
          </Form>
        </center>
      </div>
    </div>
  );
};

export default DailyTasks;
