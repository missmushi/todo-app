import React from "react";

interface ProgressProps {
  progress: number;
}

const Progress: React.FC<ProgressProps> = ({ progress }) => {
  return (
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
  );
};

export default Progress;
