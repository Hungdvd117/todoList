import { Button, Popover } from 'antd';
import React from 'react';

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

export const App: React.FC = () => (
  <Popover content={content} title="Title">
    <Button type="primary">Hover me</Button>
  </Popover>
);
