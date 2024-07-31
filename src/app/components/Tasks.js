import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Input, message } from 'antd';
import { CheckOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/dailyTasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      message.error('Error fetching tasks');
    }
  };

  const handleMarkAsDone = async (task) => {
    const updatedTask = { ...task, done: true };
    await updateTask(updatedTask);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    form.setFieldsValue(task);
  };

  const handleSave = async () => {
    const updatedTask = { ...editingGoal, ...form.getFieldsValue() };
    await updateTask(updatedTask);
    setEditingTask(null);
  };

  const updateTask = async (task) => {
    try {
      await fetch('/api/dailyTasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      fetchTasks();
      message.success('Task updated successfully');
    } catch (error) {
      message.error('Error updating task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch('/api/dailyTasks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchTasks();
      message.success('Task deleted successfully');
    } catch (error) {
      message.error('Error deleting task');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2>Tasks</h2>
      {tasks.map(task => (
        <Card key={task.id} title={task.title} style={{ marginBottom: '16px' }}>
          {editingTask && editingTask.id === task.id ? (
            <Form form={form} layout="vertical">
              <Form.Item name="title" label="Task">
                <Input />
              </Form.Item>
              <Form.Item name="targetDate" label="Date:">
                <Input />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input.TextArea rows={4} />
              </Form.Item>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary" onClick={handleSave} style={{ marginRight: '8px' }}>Save</Button>
                <Button onClick={() => setEditingTask(null)}>Cancel</Button>
              </div>
            </Form>
          ) : (
            <>
              <p style={{ textAlign: 'right' }}><strong>Date:</strong> {task.targetDate}</p>
              <p>{task.description}</p>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {task.done ? (
                  <Button type="primary" icon={<CheckOutlined />} style={{ marginRight: '8px' }}>Done</Button>
                ) : (
                  <Button type="primary" icon={<CheckOutlined />} onClick={() => handleMarkAsDone(task)} style={{ marginRight: '8px' }}>Mark as Done</Button>
                )}
                <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(task)} style={{ marginRight: '8px' }}>Edit</Button>
                <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(task.id)}>Delete</Button>
              </div>
            </>
          )}
        </Card>
      ))}
    </div>
  );
};

export default Tasks;
