
import React from 'react';
import { Timeline, Button } from 'antd';
import {
  FileTextOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import './styles.css'; 
const data = [
  {
    date: 'Apr 8, 2024',
    title: 'APT3095B',
    description: 'Past due: APT 3095B Project Submission',
    dueDate: 'Due Date: 4/10/24, 11:59 PM',
    icon: <FileTextOutlined />,
  },
  {
    date: 'May 6, 2024',
    title: 'APT3050A',
    description: 'Past due: Weekly Journal',
    dueDate: 'Due Date: 11/23/19, 11:59 PM',
    icon: <FileTextOutlined />,
  },
  {
    date: 'May 7, 2024',
    title: 'APP4035A',
    description: 'Past due: 2021 Summer Mid-semester Exam',
    dueDate: 'Due Date: 6/22/21, 9:30 AM',
    icon: <CalendarOutlined />,
  },
  {
    date: 'May 6, 2024',
    title: 'APT3050A',
    description: 'Past due: Weekly Journal',
    dueDate: 'Due Date: 11/23/19, 11:59 PM',
    icon: <FileTextOutlined />,
  },
];

const MyTimeline = () => (
  <div className="custom-timeline">
    <h2 className="important-heading">Important</h2>
    <Timeline mode="left">
      {data.map((item, index) => (
        <Timeline.Item
          key={index}
          label={item.date}
          dot={item.icon}
          color="red"
        >
          <div className="timeline-content">
            <div style={{display: "inline"}}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>{item.dueDate}</p>
            </div>
            <div style={{display: "inline"}}><Button type="primary">Dismiss</Button></div>
          </div>
        </Timeline.Item>
      ))}
    </Timeline>
  </div>
);

export default MyTimeline;
