import React from "react";
import "../styles/todoFilter.scss";

interface TodoFilterProps {
  filter: string;
  onFilterChange: (selectedFilter: string) => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, onFilterChange }) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(event.target.value);
  };

  return (
    <div>
      <select
        className="filter-dropdown"
        value={filter}
        onChange={handleFilterChange}
      >
        <option value="all">All</option>
        <option value="done">Done</option>
        <option value="undone">Undone</option>
      </select>
    </div>
  );
};

export default TodoFilter;
