import React, {useState} from "react";
import "../styles/todoFilter.scss";

interface TodoFilterProps {
  filter: string;
  onFilterChange: (selectedFilter: string) => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");

  const handleFilterChange = (option: string, label: string) => {
    onFilterChange(option);
    setSelectedOption(label);
  };

  const options = [
    { value: "all", label: "All" },
    { value: "done", label: "Done" },
    { value: "undone", label: "Undone" },
  ];

  return (
    <div>
      <div className="custom-dropdown">
        <div className="dropdown-select">
          <div className={`selected-option ${isOpen ? "open" : ""} display-flex`} onClick={() => setIsOpen(!isOpen)}>
            {selectedOption || "Select an option"}
            <i className="fas fa-chevron-down fa-xs"></i>
          </div>
         
          {isOpen && (
            <ul className="options">
              {options.map((option) => (
                <div
                  key={option.value}
                  className="option"
                  onClick={() => handleFilterChange(option.value, option.label)}
                >
                  {option.label}
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoFilter;
