"use client";

import React, { useState, useEffect } from 'react';
import { CloseOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Modal } from 'antd';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

const TaskForm = ({
  task,
  index,
  editIndex,
  form,
  handleSave,
  handleEdit,
  handleDone,
  handleRemove,
  onCancelEdit,
}) => (
  <Card
    size="small"
    key={task.id}
    title={
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{task.date}</span>
        <span>{`Item ${task.originalIndex + 1}`}</span>
        <CloseOutlined onClick={() => handleRemove(task.id)} style={{ marginLeft: '10px' }} />
      </div>
    }
    style={{marginBottom:'5px'}}
  >
    <Form.Item
      label="Task"
      name={`task_${task.id}`}
      initialValue={task.task}
      rules={[{ required: true, message: 'Please input the task!' }]}
    >
      <Input disabled={editIndex !== task.id && task.saved} />
    </Form.Item>
    <Form.Item
      label="Description"
      name={`description_${task.id}`}
      initialValue={task.description}
    >
      <Input.TextArea rows={2} disabled={editIndex !== task.id && task.saved} />
    </Form.Item>
    <Form.Item>
      {editIndex === task.id ? (
        <div>
          <Button type="primary" onClick={() => handleSave(task.id)} style={{ float: 'right', backgroundColor:'#c04b10' }}>
            Save
          </Button>
          <Button type="default" onClick={onCancelEdit} style={{ marginRight: 8 }}>
            Cancel
          </Button>
        </div>
      ) : (
        <div>
          {!task.saved ? (
            <Button type="primary" onClick={() => handleSave(task.id)} style={{ float: 'right', backgroundColor:'#c04b10' }}>
              Save
            </Button>
          ) : (
            <div>
              <Button type="default" onClick={() => handleDone(task.id)} style={{ marginRight: 8 }}>
                Done
              </Button>
              <Button type="default" onClick={() => handleEdit(task.id)} style={{ marginRight: 8 }}>
                Edit
              </Button>
            </div>
          )}
        </div>
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
    const date = moment().format('YYYY-MM-DD');
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        task: '',
        description: '',
        date,
        done: false,
        saved: false,
        originalIndex: tasks.length,
      },
    ]);
  };

  const handleSave = (id) => {
    form.validateFields([`task_${id}`, `description_${id}`])
      .then((values) => {
        setTasks((prevTasks) => {
          const newTasks = prevTasks.map((task) =>
            task.id === id
              ? { ...task, task: values[`task_${id}`], description: values[`description_${id}`], saved: true }
              : task
          );
          saveTasksToLocalStorage(newTasks);
          return newTasks;
        });
        message.success('Task saved locally!');
        setEditIndex(null);
      })
      .catch(() => {
        message.error('Please fill in the required fields before saving.');
      });
  };

  const handleEdit = (id) => {
    setEditIndex(id);
    const task = tasks.find((task) => task.id === id);
    form.setFieldsValue({
      [`task_${id}`]: task.task,
      [`description_${id}`]: task.description,
    });
  };

  const handleDone = async (id) => {
    Modal.confirm({
      title: 'Save task?',
      content: 'Would you like to save this task for future reference?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        const task = tasks.find((task) => task.id === id);
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
            handleRemove(id);
          } else {
            message.error('Failed to save task to server');
          }
        } catch (error) {
          message.error('An error occurred while saving the task');
          console.error(error);
        }
      },
      onCancel: () => handleRemove(id),
    });
  };

  const handleRemove = (id) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.filter((task) => task.id !== id);
      saveTasksToLocalStorage(newTasks);
      return newTasks;
    });
    message.info('Task removed');
  };

  const onCancelEdit = () => {
    setEditIndex(null);
  };

  return (
    <div>
      <div style={{ padding: '5px', justifyContent: 'center', display: 'flex' }}>
        <h1 style={{margin:'0', color:'white', marginBottom:'10px'}}>What would you Love to Accomplish Today</h1>
      </div>
      <div style={{ padding: '5px', justifyContent: 'center', position: 'relative' }}>
        <center>
          <Form
            form={form}
            name="daily_tasks"
            style={{ maxWidth: 900, margin: 0, boxShadow: 5 }}
            autoComplete="off"
          >
            {tasks.map((task, index) => (
              <TaskForm
                key={task.id}
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
            <div style={{marginBottom:'60px'}}><Button type="dashed" onClick={handleAddTask} block style={{ marginBottom: '50px', fontWeight:'bold', backgroundColor:'#c04b10', width:'100px', margin:'0', color:'white' }}>
              <PlusCircleFilled/> Add Item
            </Button></div>
          </Form>
        </center>
      </div>
    </div>
  );
};

export default DailyTasks;
