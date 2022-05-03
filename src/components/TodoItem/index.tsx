import React from "react";

import { ITodo } from '../../interfaces';

export const TodoItem: React.FC<{
  item: ITodo,
  handleChecked: (event: React.ChangeEvent<HTMLInputElement>, item: ITodo) => void,
  handleDeleteTask: (taskId: string) => void
}> = ({ item, handleChecked, handleDeleteTask }) => {
  return(
    <li className={`todo_item checked_${item.complete}`}>
      <label>
        <input type="checkbox" checked={item.complete} onChange={(event) => handleChecked(event, item)}/>
        <span>
          {item.title}
        </span>
      </label>

      <i className="fas fa-solid fa-trash right-icon clickable" onClick={() => handleDeleteTask(item.id)}/>
  </li>
  );
}