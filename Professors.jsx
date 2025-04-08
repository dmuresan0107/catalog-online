import React, { useState } from "react";

export default function Professors() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [grade, setGrade] = useState("");

  const handleAddGrade = () => {
    alert(
      `Grade ${grade} added for student ${selectedStudent} in class ${selectedClass}`
    );
    setGrade("");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Professors Page</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Select Class:{" "}
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="Math">Math</option>
            <option value="Biology">Biology</option>
            <option value="Chemistry">Chemistry</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Select Student:{" "}
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
            <option value="Charlie">Charlie</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Enter Grade:{" "}
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </label>
      </div>

      <button onClick={handleAddGrade}>Add Grade</button>
    </div>
  );
}
