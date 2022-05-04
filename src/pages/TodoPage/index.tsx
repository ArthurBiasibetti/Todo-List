import React, { useEffect, useState } from "react";
import TodoService from '../../service/todo.service';

import './style.scss';

import { Todo } from '../../components';
import { ITodo } from '../../interfaces';

export const TodoPage = () => {
  const [tasks, setTasks] = useState<ITodo[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  const fetchUsers = async (): Promise<void> => {
    try {
      setIsLoadingTasks(true);
      const data = await TodoService.todos();
      setTasks(data);

      if(data){
        setIsLoadingTasks(false);
      }
    } catch (error) {
      console.error(error)
    }
  };

  const addTask = async (task: ITodo) => {
    const result = await TodoService.create(task.title, task.description, task.complete);
    fetchUsers();

    return result;
  }

  const deleteTask = async (taskId: string) => {
    await TodoService.delete(taskId);
    fetchUsers();
  }

  const updateTask = async (taskId: string, complete: boolean) => {
    await TodoService.updateComplete(taskId, complete)
    fetchUsers();
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    window.addEventListener('focus', fetchUsers);

    return function cleaneup() {
      window.removeEventListener('focus', fetchUsers);
    }
  }, [])

  return (
    <div className="main">
      <div className="content">
        <Todo
          title="Lista de compras"
          tasks={tasks}
          handleAddTask={addTask}
          handleDeleteTask={deleteTask}
          handleUpdateTask={updateTask}
          isLoadingTasks={isLoadingTasks}
        />
      </div>
    </div>
  )
}