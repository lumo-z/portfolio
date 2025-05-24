// src/components/TodoList.tsx
import React, { useState } from 'react';
import TodoItem from './todoitem';
import { Todo } from '../types/Todo';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: '学习React', completed: false },
    { id: 2, text: '写TypeScript代码', completed: true },
  ]);

  const [inputValue, setInputValue] = useState<string>('');

  const addTodo = () => {
    if (inputValue.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  return (
    <div>
      <h2>待办事项</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="输入新任务"
        />
        <button onClick={addTodo}>添加</button>
      </div>

      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} onToggle={toggleComplete} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
