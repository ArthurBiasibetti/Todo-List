import React, {useState} from "react";
import './style.scss'

export const TodoTaskForm: React.FC<{handleCancel: () => void, handleAddTask: (title: string, description: string) => void}> = ({handleAddTask, handleCancel}) => {
  const [taskTitle, setTaskTitle] = useState('');
  let timer = setTimeout(() => {} ,0);

  const handleDebounce = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    timer = setTimeout(() => setTaskTitle(event.target.value), 550);
  }

  return (
    <>
      <input type="text" placeholder="Qual o nome da tarefa" onChange={handleDebounce} autoFocus/>
      <i className={`fas fa-solid fa-check clickable icon_button approve ${taskTitle ? '' : 'disabled'}`}  onClick={() => handleAddTask(taskTitle, '')}></i>
      <i className="fas fa-solid fa-ban clickable icon_button cancel" onClick={() => handleCancel()}></i>
    </>
  )
}