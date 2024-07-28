"use client";

import React from 'react';
import { Row, Col, Card, Carousel } from 'antd';

export default function Home() {
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: 'orangered',
  };

  
  return (
    <div>
      <h1>This is home page</h1>
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Card title" bordered={false} 
              style={{ 
                backgroundColor: '#f0f2f5',
                marginTop: "10px"
              }}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false} 
              style={{ 
                backgroundColor: '#f0f2f5',
                marginTop: "10px"
              }}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false} 
              style={{ 
                backgroundColor: '#f0f2f5',
                marginTop: "10px"
              }}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>
     
      <div style={{marginTop: "30px"}}>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>Slide 1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>Slide 2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>Slide 3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>Slide 4</h3>
        </div>
      </Carousel>
      </div>
    </div>
  );
}
