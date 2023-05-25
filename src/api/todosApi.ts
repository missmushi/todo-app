import axios from 'axios';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const API_BASE_URL = 'http://localhost:3001';

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(`${API_BASE_URL}/todos`);
  return response.data;
};

export const createTodo = async (todo: Todo): Promise<Todo> => {
  const response = await axios.post<Todo>(`${API_BASE_URL}/todos`, todo);
  return response.data;
};

export const updateTodo = async (id: string, updatedFields: Partial<Todo>): Promise<Todo> => {
  const response = await axios.put<Todo>(`${API_BASE_URL}/todos/${id}`, updatedFields);
  return response.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/todos/${id}`);
};
