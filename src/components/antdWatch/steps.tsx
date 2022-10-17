import { Steps } from 'antd';
import React from 'react';

const { Step } = Steps;

export const App: React.FC = () => (
  <Steps size="small" current={1}>
    <Step title="Finished" />
    <Step title="In Progress" />
    <Step title="Waiting" />
  </Steps>
);
