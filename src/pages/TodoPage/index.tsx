import React, { useEffect, useState } from "react";
import TodoService from '../../service/todo.service';

import './style.scss';

import { Todo } from '../../components';
import { ITodo } from '../../interfaces';

export const TodoPage = () => {
  const [tasks, setTasks] = useState<ITodo[]>([]);

  const fetchUsers = async (): Promise<void> => {
    try {
      const data = await TodoService.todos();
      setTasks(data);
    } catch (error) {
      console.error(error)
    }
  };

  const addTask = async (task: ITodo) => {
    await TodoService.create(task.title, task.description, task.complete);
    fetchUsers();
  }

  const deleteTask = async (taskId: string) => {
    await TodoService.delete(taskId);
    fetchUsers();
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <div className="main">
      <div className="content">
        <Todo title="Lista de compras" tasks={tasks} handleTasks={addTask} handleDeleteTask={deleteTask}/>
      </div>
    </div>
  )
}