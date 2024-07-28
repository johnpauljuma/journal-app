"use client";

import React from 'react';
import { Card, Row, Col } from 'antd';

const Journal = () => {
  return (
    <div>
      <div style={{ backgroundColor: "orange", padding: "10px" }}>
        <h1 style={{ margin: 0, color: "#fff", textAlign: "center" }}>Journals Overview</h1>
      </div>
      <div style={{ padding: "20px" }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Daily Reflection" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Goals" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Daily Tasks" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Journal;
