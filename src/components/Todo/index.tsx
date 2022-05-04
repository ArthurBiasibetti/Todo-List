import React, { useState } from "react";
import './style.scss';

import { TodoItem, TodoTaskForm } from '../../components';

import { ITodo } from '../../interfaces';

type taskFilters = 'todos' | 'concluidos' | 'pendentes'

export const Todo: React.FC<{
  title: string,
  tasks?: ITodo[],
  handleAddTask:  (task: ITodo) => void,
  handleDeleteTask: (taskId: string) => void,
  handleUpdateTask: (taskId: string, complete: boolean) => void
}> = ({title, tasks = [], handleAddTask, handleDeleteTask, handleUpdateTask}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [taskFilter, setTaskFilter] = useState<taskFilters>('todos');

  const todoLength = tasks.length;
  const todoCheckedsLength = tasks.filter((task) => task.complete).length;
  const isTodoCompleted = todoCheckedsLength === todoLength && todoLength > 0;

  const handleIsAddingTask = () => {
    setIsAdding((prevState) => !prevState );
  }

  const handleCancelNewTask = () => { setIsAdding(false) };

  const handleAddNewTask = async (title: string, description: string) => {
    handleAddTask({id: '', title, description: description || 'Default description', complete: false});
    setIsAdding(false);
  }

  // Colocar o UPDATE DA API
  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>, task: ITodo) => {
    handleUpdateTask(task.id, event.target.checked)
  }

  const handleTaskFilter = () => {
    if(taskFilter === 'todos') {
      setTaskFilter('concluidos');
    } else if (taskFilter === 'concluidos') {
      setTaskFilter('pendentes');
    } else {
      setTaskFilter('todos');
    }
  }

  const handleFilter = (task: ITodo) => {
      if(taskFilter === 'todos'){
        return task
      } else if(taskFilter === 'concluidos' && task.complete) {
        return task
      } else if (taskFilter === 'pendentes' && !task.complete) {
        return task
      }
    }

  return (
      <div className="todo">
        <div className={`todo_title ${ isTodoCompleted ? 'completed' : ''}`}>
          <h1>
            {title}
          </h1>
          <span className={isTodoCompleted ? 'completed' : ''}>
            {todoCheckedsLength}/{todoLength}
          </span>

          <span className={isTodoCompleted ? 'completed' : ''}>
            Resta {todoLength - todoCheckedsLength} {todoLength - todoCheckedsLength > 1 ? 'tarefas' : 'tarefa'}
          </span>

          <span className="clickable" onClick={() => handleTaskFilter()}>Mostrar {taskFilter}</span>
        </div>

        <div className="todo_content">
          <ul>
            {tasks.filter(handleFilter).map((task) => (
              <TodoItem key={task.id} item={task} handleChecked={handleChecked} handleDeleteTask={handleDeleteTask}/>
            ))}
            <li className="todo_item add_task">
              {isAdding
              ? <TodoTaskForm handleCancel={handleCancelNewTask} handleAddTask={handleAddNewTask}/>
              : <button className="add_task_button" onClick={handleIsAddingTask}>
                <i className="fas fa-solid fa-plus" />
                <span className="add_button_title">
                  Adicionar tarefa
                </span>
              </button> }
            </li>
          </ul>
        </div>
      </div>
  )
}