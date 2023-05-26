import React, { useEffect, useState } from "react";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../api/todosApi";
import DropdownMenu from "./DropdownMenu";
import CardInputBox from "./CardInput";
import TaskFilter from "./TodoFilter";
import Progress from "./Progress";
import "../styles/todoTask.scss";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

function filterTodos(todos: Todo[], filter: string): Todo[] {
  switch (filter) {
    case "completed":
      return todos.filter((todo) => todo.completed);
    case "incomplete":
      return todos.filter((todo) => !todo.completed);
    default:
      return todos;
  }
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodoId, setEditingTodoId] = useState<string>("");
  const [editingTodoTitle, setEditingTodoTitle] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTodos()
      .then((response) => {
        setTodos(response);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  const addTodo = (newTodo: string) => {
    if (newTodo.trim() === "") return;
    const todo: Todo = {
      id: "", // The server will generate the ID
      title: newTodo,
      completed: false,
    };
    createTodo(todo)
      .then((response) => {
        setTodos([...todos, response]);
      })
      .catch((error) => {
        console.error("Error creating todo:", error);
      });
  };

  const deleteTodoItem = (id: string) => {
    deleteTodo(id)
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  const handleTodoUpdate = (id: string, updatedFields: any) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...updatedFields } : todo
    );
    setTodos(updatedTodos);
  
    updateTodo(id, updatedFields)
      .then(() => {
        // Handle the updated todo if needed
        if (id === editingTodoId) {
          setEditingTodoId("");
          setEditingTodoTitle("");
        }
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };
  
  const toggleTodo = (id: string) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      const updatedFields = {
        id: todoToUpdate.id,
        title: todoToUpdate.title,
        completed: !todoToUpdate.completed,
      };
      handleTodoUpdate(id, updatedFields);
    }
  };
  
  const saveEditing = () => {
    if (editingTodoTitle.trim() === "") return;
    const todoToUpdate = todos.find((todo) => todo.id === editingTodoId);
    if (todoToUpdate) {
      const updatedFields = {
        id: editingTodoId,
        title: editingTodoTitle,
        completed: todoToUpdate.completed,
      };
      handleTodoUpdate(editingTodoId, updatedFields);
    }
  };

  const startEditing = (id: string, title: string) => {
    setEditingTodoId(id);
    setEditingTodoTitle(title);
  };
  
  const filteredTodos = filterTodos(todos, filter);
  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="display">
      <Progress progress={progress} />

      <div className="display-flex gap">
        <h2>Task</h2>
        <TaskFilter filter={filter} onFilterChange={handleFilterChange} />
      </div>

      {filteredTodos.map((todo) => (
        <div className="task" key={todo.id}>
          {editingTodoId === todo.id ? (
            <div className="display-flex edit-input">
              <input
                type="text"
                value={editingTodoTitle}
                onChange={(e) => setEditingTodoTitle(e.target.value)}
              />
              <button onClick={saveEditing} className="save-button">
                Save
              </button>
            </div>
          ) : (
            <>
              <div className="display-flex">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className="checkmark"></span>
                  <span
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      color: todo.completed ? "#A9A9A9" : "#2E2E2E",
                    }}
                  >
                    {todo.title}
                  </span>
                </label>
                <DropdownMenu
                  onDelete={deleteTodoItem}
                  id={todo.id}
                  onEdit={() => startEditing(todo.id, todo.title)}
                />
              </div>
            </>
          )}
        </div>
      ))}

      <CardInputBox onTitleAdded={addTodo} />
    </div>
  );
};

export default TodoApp;

