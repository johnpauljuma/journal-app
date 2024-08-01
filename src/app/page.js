"use client";

import React from 'react';
import { Row, Col, Card, Carousel, imgStyle} from 'antd';
import home1 from './assets/home1.png';
import home2 from './assets/home2.png';

export default function Home() {
  const contentStyle = {
    height: '250px',
    color: '#fff',
    lineHeight: '250px',
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
            <img src={home1} alt="Home 1" style={imgStyle} />
        </div>
        <div>
            <img src={home2} alt="Home 2" style={imgStyle} />
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
