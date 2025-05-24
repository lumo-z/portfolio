import React from 'react';
import TodoList from './components/todo';

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>我的待办清单</h1>
      <TodoList />
    </div>
  );
};

export default App;
