// src/components/TodoItem.tsx
import React from 'react';
import { Todo } from '../types/Todo';

type TodoItemProps = {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onToggle }) => {
  return (
    <li
      style={{
        textDecoration: todo.completed ? 'line-through' : 'none',
        marginBottom: '5px',
      }}
    >
      <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />
      <span style={{ marginLeft: '8px' }}>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)} style={{ marginLeft: '10px', color: 'red' }}>
        删除
      </button>
    </li>
  );
};

export default TodoItem;
