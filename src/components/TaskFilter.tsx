import React from "react";
import "../styles/taskFilter.scss"

interface TaskFilterProps {
  filter: string;
  onFilterChange: (selectedFilter: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ filter, onFilterChange }) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(event.target.value);
  };

  return (
    <div className="filter-container">
      <select
        className="filter-dropdown"
        value={filter}
        onChange={handleFilterChange}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  );
};

export default TaskFilter;
