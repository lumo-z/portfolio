// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; // 引入全局样式文件
import App from './App'; // 引入主应用组件

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
