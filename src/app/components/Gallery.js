"use client"

import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Modal } from 'antd';

const Gallery = () => {
  const [dailyReflections, setDailyReflections] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    fetchDailyReflections();
  }, []);

  const fetchDailyReflections = async () => {
    try {
      const response = await fetch('/api/dailyReflections');
      const data = await response.json();
      setDailyReflections(data);
    } catch (error) {
      console.error('Error fetching daily reflections:', error);
    }
  };

  const showModal = (imagePath) => {
    setCurrentImage(imagePath);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentImage('');
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0', color:'white' }}>Gallery</h1>
      <Row gutter={16}>
        {dailyReflections.map((reflection, index) => (
          <Col key={index} span={8}>
            <Card
              hoverable
              cover={
                <div style={{ height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }} onClick={() => showModal(reflection.imagePath)}>
                  <img alt="reflection" src={reflection.imagePath} style={{ width: '400px', height: '300px', objectFit: 'cover', marginTop:'10px'}} />
                </div>
              }
              style={{ height: '330px', position: 'relative', marginBottom:'40px', marginLeft:'10px', marginTop:'0' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#c04b10', color: 'white', padding: '10px', position: 'absolute', bottom: 0, width: '300px', margin:'0', borderRadius:'5px'}}>
                <span>{reflection.title}</span>
                <span>{reflection.date}</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal visible={isModalVisible} footer={null} onCancel={handleCancel}>
        <img alt="reflection" src={currentImage} style={{ width: '100%' }} />
      </Modal>
    </div>
  );
};

export default Gallery;
