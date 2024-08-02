"use client";

import React, { useState, useEffect } from 'react';
import { Badge, Calendar as AntdCalendar, Button, Modal, Form, Input, DatePicker } from 'antd';
import moment from 'moment';

const getListData = (value, events) => {
  return events[value.format('YYYY-MM-DD')] || [];
};

const MyCalendar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const date = values.date.format('YYYY-MM-DD');
      const newEvent = { name: values.name, description: values.description, date };

      fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      })
        .then(response => response.json())
        .then(() => {
          setEvents((prevEvents) => {
            const newEvents = { ...prevEvents };
            if (!newEvents[date]) {
              newEvents[date] = [];
            }
            newEvents[date].push(newEvent);
            return newEvents;
          });
          setIsModalVisible(false);
          form.resetFields();
        })
        .catch(error => console.error('Error saving event:', error));
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleEventClick = (date) => {
    setSelectedDate(date.format('YYYY-MM-DD'));
    setEventModalVisible(true);
  };

  const handleEventModalCancel = () => {
    setEventModalVisible(false);
    setSelectedDate(null);
  };

  const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  };

  const deleteEvent = (date, index) => {
    const eventToDelete = events[date][index];
    fetch('/api/events', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: eventToDelete.id, date }),
    })
      .then(response => response.json())
      .then(() => {
        setEvents((prevEvents) => {
          const newEvents = { ...prevEvents };
          newEvents[date].splice(index, 1);
          if (newEvents[date].length === 0) {
            delete newEvents[date];
          }
          return newEvents;
        });
      })
      .catch(error => console.error('Error deleting event:', error));
  };

  const dateCellRender = (value) => {
    const listData = getListData(value, events);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Badge status="success" text={item.name} />
            <div>{item.description}</div>
            <Button type="link" onClick={() => deleteEvent(value.format('YYYY-MM-DD'), index)} style={{ marginLeft: '10px' }}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <div style={{ textAlign: 'right', marginBottom: '10px', marginTop: '20px', marginRight: '60px' }}>
        <Button type="primary" onClick={showModal} style={{ backgroundColor: '#a6410e', fontWeight: 'bold' }}>
          Add an Event
        </Button>
      </div>
      <AntdCalendar className="custom-calendar" dateCellRender={dateCellRender} style={{ height: '70vh' }} onSelect={handleEventClick} />
      <Modal title="Add Event" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select a date!' }]}>
            <DatePicker disabledDate={disabledDate} />
          </Form.Item>
          <Form.Item name="name" label="Event Name" rules={[{ required: true, message: 'Please input the event name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Event Description" rules={[{ required: true, message: 'Please input the event description!' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={`Events on ${selectedDate}`}
        visible={eventModalVisible}
        onCancel={handleEventModalCancel}
        footer={[
          <Button key="close" onClick={handleEventModalCancel}>
            Close
          </Button>
        ]}
      >
        <ul className="events">
          {selectedDate && getListData(moment(selectedDate), events).map((item, index) => (
            <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Badge status="success" text={item.name} />
              <div>{item.description}</div>
              <Button type="link" onClick={() => deleteEvent(selectedDate, index)} style={{ marginLeft: '10px' }}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default MyCalendar;
