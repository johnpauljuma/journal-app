"use client";

import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';

const Journal = () => {
  const [dailyReflectionsCount, setDailyReflectionsCount] = useState(0);
  const [achievedGoals, setAchievedGoals] = useState(0);
  const [notAchievedGoals, setNotAchievedGoals] = useState(0);
  const [dailyTasksCount, setDailyTasksCount] = useState(0);

  useEffect(() => {
    // Fetch daily reflections count
    fetch('/api/dailyReflections')
      .then(response => response.json())
      .then(data => {
        setDailyReflectionsCount(data.length);
      })
      .catch(error => console.error('Error fetching daily reflections:', error));

    // Fetch goals count
    fetch('/api/goals')
      .then(response => response.json())
      .then(data => {
        setAchievedGoals(data.counts.achievedGoals);
        setNotAchievedGoals(data.counts.notAchievedGoals);
      })
      .catch(error => console.error('Error fetching goals:', error));

    // Fetch daily tasks count
    fetch('/api/dailyTasks')
      .then(response => response.json())
      .then(data => {
        setDailyTasksCount(data.length);
      })
      .catch(error => console.error('Error fetching daily tasks:', error));
  }, []);

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '150px',
    textAlign: 'center',
  };

  const goalsCardStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '150px',
    padding: '10px',
  };

  const goalsContentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  };

  const goalsInnerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10px',
  };

  return (
    <div>
      <div style={{ backgroundColor: "", padding: "10px" }}>
        <h1 style={{ margin: 0, color: "#fff", textAlign: "center" }}>Journals Overview</h1>
      </div>
      <div style={{ padding: "20px" }}>
        <Row gutter={24}>
          <Col span={7}>
            <Card title="Daily Reflection" bordered={false} style={cardStyle}>
              <h1>{dailyReflectionsCount}</h1>
            </Card>
          </Col>
          <Col span={10}>
            <Card title="Goals" bordered={false} style={goalsCardStyle}>
              <div style={goalsContentStyle}>
                <div style={goalsInnerStyle}>
                  <h4>Achieved</h4>
                  <h1>{achievedGoals}</h1>
                </div>
                <div style={goalsInnerStyle}>
                  <h4>Yet to Achieve</h4>
                  <h1>{notAchievedGoals}</h1>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={7}>
            <Card title="Daily Tasks" bordered={false} style={cardStyle}>
              <h1>{dailyTasksCount}</h1>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Journal;
