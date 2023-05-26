import React, { useState, useEffect, useRef } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../api/todosApi";
import "../styles/dropdown.scss";

interface Props {
  todo: {
    id: string;
    title: string;
    completed: boolean;
  };
}

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface DropdownMenuProps {
  id: string;
  onDelete: (id: string) => void;
  onEdit: () => void;
}

function DropdownMenu({ id, onDelete, onEdit }: DropdownMenuProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTodos()
      .then((response) => {
        setTodos(response);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

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

  const handleEditClick = () => {
    setIsEditing(true);
    setIsDropdownOpen(false);
    onEdit();
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setIsDropdownOpen(true);
   
  };

  const handleDelete = () => {
    // Add your delete logic here
    onDelete(id);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-menu" ref={menuRef}>
      <div
        className={`dropdown-toggle ${isDropdownOpen ? "open" : ""}`}
        onClick={handleToggleDropdown}
      >
        {isEditing ? (
          <button onClick={handleSaveClick} className="save-button">
            Save
          </button>
        ) : (
          <>
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </>
        )}
      </div>
      {isDropdownOpen && (
        <div className="dropdown-content">
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
