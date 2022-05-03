import HttpClient from "./httpClient";
import { ITodo } from '../interfaces';

class TodoService {
  static async todos(): Promise<ITodo[]> {
    const { data } = await HttpClient.api.get<ITodo[]>('/todos');
    return data;
  }

  static async todo(id: string): Promise<ITodo> {
    const { data } = await HttpClient.api.get<ITodo>(`/todos/${id}`);
    return data;
  }

  static async create(title: string, description = 'adasda', complete: boolean ): Promise<void> {
    const obj = {
      title,
      description,
      complete
    }

    const { data } = await HttpClient.api.post('/todos', obj);
    return data;
  }

  static async update(title: string, description = '', complete: boolean, id: string ): Promise<void> {
    const obj = {
      title,
      description,
      complete
    }

    const { data } = await HttpClient.api.put(`/todos/${id}`, obj);
    return data;
  }

  static async delete(id: string ): Promise<void> {
    const { data } = await HttpClient.api.delete(`/todos/${id}`);
    return data;
  }
}

export default TodoService;