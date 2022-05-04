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
        />
      </div>
    </div>
  )
}