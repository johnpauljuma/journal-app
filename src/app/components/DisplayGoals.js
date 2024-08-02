import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Input, message } from 'antd';
import { CheckOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const DisplayGoals = () => {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await fetch('/api/goals');
      const data = await response.json();
      console.log('Fetched data:', data); // Log the fetched data
      if (Array.isArray(data.goals)) {
        setGoals(data.goals);
      } else {
        message.error('Invalid data format');
      }
    } catch (error) {
      message.error('Error fetching goals');
    }
  };

  const handleMarkAsAchieved = async (goal) => {
    const updatedGoal = { ...goal, achieved: true };
    await updateGoal(updatedGoal);
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    form.setFieldsValue(goal);
  };

  const handleSave = async () => {
    const updatedGoal = { ...editingGoal, ...form.getFieldsValue() };
    await updateGoal(updatedGoal);
    setEditingGoal(null);
  };

  const updateGoal = async (goal) => {
    try {
      await fetch('/api/goals', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goal),
      });
      fetchGoals();
      message.success('Goal updated successfully');
    } catch (error) {
      message.error('Error updating goal');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch('/api/goals', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchGoals();
      message.success('Goal deleted successfully');
    } catch (error) {
      message.error('Error deleting goal');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{margin:'0', color:'white', marginBottom:'10px'}}>Goals</h2>
      {Array.isArray(goals) && goals.length > 0 ? (
        goals.map(goal => (
          <Card key={goal.id} title={goal.title} style={{ marginBottom: '16px' }}>
            {editingGoal && editingGoal.id === goal.id ? (
              <Form form={form} layout="vertical">
                <Form.Item name="title" label="Title">
                  <Input />
                </Form.Item>
                <Form.Item name="targetDate" label="Achievable by:">
                  <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                  <Input.TextArea rows={4} />
                </Form.Item>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button type="primary" onClick={handleSave} style={{ marginRight: '8px' }}>Save</Button>
                  <Button onClick={() => setEditingGoal(null)}>Cancel</Button>
                </div>
              </Form>
            ) : (
              <>
                <p style={{ textAlign: 'right' }}><strong>Achievable by:</strong> {goal.targetDate}</p>
                <p>{goal.description}</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {goal.achieved ? (
                    <Button type="primary" icon={<CheckOutlined />} style={{ marginRight: '8px', backgroundColor:'#e18437' }}>Achieved</Button>
                  ) : (
                    <Button type="primary" icon={<CheckOutlined />} onClick={() => handleMarkAsAchieved(goal)} style={{ marginRight: '8px', backgroundColor:'#e18437' }}>Mark as Achieved</Button>
                  )}
                  <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(goal)} style={{ marginRight: '8px', backgroundColor:'#e18437' }}>Edit</Button>
                  <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(goal.id)} style={{border:'solid #e18437'}}>Delete</Button>
                </div>
              </>
            )}
          </Card>
        ))
      ) : (
        <p>No goals available</p>
      )}
    </div>
  );
};

export default DisplayGoals;
