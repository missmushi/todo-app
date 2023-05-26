import React, { useEffect, useState } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "./api/todosApi";
import "./styles/todo.scss";
import DropdownMenu from "./components/DropdownMenu";
import CardInputBox from "./components/CardInputBox";
import TaskFilter from "./components/TaskFilter";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
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
        setNewTodo("");
      })
      .catch((error) => {
        console.error("Error creating todo:", error);
      });
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      const updatedFields = {
        id: id,
        title: todoToUpdate.title,
        completed: !todoToUpdate.completed,
      };
      updateTodo(id, updatedFields)
        .then((updatedTodo) => {
          // Handle the updated todo if needed
        })
        .catch((error) => {
          console.error("Error updating todo:", error);
        });
    }
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

  const startEditing = (id: string, title: string) => {
    setEditingTodoId(id);
    setEditingTodoTitle(title);
  };

  const cancelEditing = () => {
    setEditingTodoId("");
    setEditingTodoTitle("");
  };

  const saveEditing = () => {
    if (editingTodoTitle.trim() === "") return;
    const updatedTodos = todos.map((todo) =>
      todo.id === editingTodoId ? { ...todo, title: editingTodoTitle } : todo
    );
    setTodos(updatedTodos);
    console.log("updatedTodos", updatedTodos);

    const todoToUpdate = todos.find((todo) => todo.id === editingTodoId);
    if (todoToUpdate) {
      const updatedFields = {
        id: editingTodoId,
        title: editingTodoTitle,
        completed: todoToUpdate.completed,
      };
      updateTodo(editingTodoId, updatedFields)
        .then(() => {
          // Handle the updated todo if needed
          setEditingTodoId("");
          setEditingTodoTitle("");
        })
        .catch((error) => {
          console.error("Error updating todo:", error);
        });
    }
  };

  const filteredTodos = filterTodos(todos, filter);

  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="yolo">
      <div className="progress">
        <h1>Progress</h1>
        <div
          style={{
            width: "100%",
            height: "7.34px",
            backgroundColor: "#3B3B3B",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#FFFFFF",
              borderRadius: "10px",
            }}
          />
        </div>
        <p>{progress.toFixed(0)}% completed</p>
      </div>
      <div className="menu">
      <h2>Task</h2>
      <TaskFilter filter={filter} onFilterChange={handleFilterChange} />
      </div>
      {filteredTodos.map((todo) => (
        <div className="task" key={todo.id}>
          {editingTodoId === todo.id ? (
            <div className="menu edit-input-box">
              <input
                type="text"
                value={editingTodoTitle}
                onChange={(e) => setEditingTodoTitle(e.target.value)}
              />
              {/* <button onClick={saveEditing}>Save</button>
              <button onClick={cancelEditing}>Cancel</button> */}
              <button onClick={saveEditing} className="save-button">
                Save
              </button>
            </div>
          ) : (
            <>
              <div className="menu">
                <label className="main">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className="geekmark"></span>
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
              {/* <button onClick={() => startEditing(todo.id, todo.title)}>
                Edit
              </button> */}
            </>
          )}
          {/* <button onClick={() => deleteTodoItem(todo.id)}>Delete</button> */}
        </div>
      ))}
      {/* <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      /> */}
      {/* <button onClick={addTodo}>Add Todo</button> */}
      <CardInputBox onTitleAdded={addTodo} />
    </div>
  );
};

export default TodoApp;

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
