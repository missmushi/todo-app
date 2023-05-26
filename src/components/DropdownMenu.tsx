import React, { useState, useEffect, useRef } from "react";
import "../styles/dropdownMenu.scss";

interface DropdownMenuProps {
  id: string;
  onDelete: (id: string) => void;
  onEdit: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ id, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
          <option onClick={handleEditClick}>Edit</option>
          <option onClick={handleDelete} className="delete-option">
            Delete
          </option>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
