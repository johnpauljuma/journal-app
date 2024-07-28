"use client";

import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import moment from 'moment';

const DailyTasks = () => {
  const [form] = Form.useForm();
  const currentDate = moment().format('YYYY-MM-DD');

  return (
    <div>
      <div style={{ padding: '5px', justifyContent: 'center', display: 'flex' }}>
        <h1>What would you Love to Accomplish Today</h1>
      </div>
      <div style={{ padding: '5px', justifyContent: 'center', position: 'relative' }}>
        <center>
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            form={form}
            name="dynamic_form_complex"
            style={{
              maxWidth: 900,
              margin: 0,
              boxShadow: 5,
            }}
            autoComplete="off"
            initialValues={{
              items: [{}],
            }}
          >
            <Form.List name="items">
              {(fields, { add, remove }) => (
                <div
                  style={{
                    display: 'flex',
                    rowGap: 16,
                    flexDirection: 'column',
                  }}
                >
                  {fields.map((field) => (
                    <Card
                      size="small"
                      key={field.key}
                      title={
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{currentDate}</span>
                          <span>{`Item ${field.name + 1}`}</span>
                          <CloseOutlined
                            onClick={() => {
                              remove(field.name);
                            }}
                            style={{ marginLeft: '10px' }}
                          />
                        </div>
                      }
                    >
                      <Form.Item label="Task" name={[field.name, 'task']}>
                        <Input />
                      </Form.Item>
                      <Form.Item label="Description" name={[field.name, 'description']}>
                        <Input.TextArea rows={2} />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" style={{ float: 'left', display:'block' }}>
                          Save
                        </Button>
                      </Form.Item>
                    </Card>
                  ))}

                  <Button type="dashed" onClick={() => add()} block style={{ marginBottom: '40px' }}>
                    + Add Item
                  </Button>
                </div>
              )}
            </Form.List>
          </Form>
        </center>
      </div>
    </div>
  );
};

export default DailyTasks;
