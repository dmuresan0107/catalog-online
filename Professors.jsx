mport React, { useState } from "react";

const students = ["Maria Popescu", "Ion Ionescu", "Elena Georgescu", "Andrei Petrescu"];

export default function PaginaProfesor() {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [grade, setGrade] = useState("");
  const [grades, setGrades] = useState([]);

  const handleAddGrade = (e) => {
    e.preventDefault();
    if (!selectedStudent || !grade) return;

    setGrades([...grades, { student: selectedStudent, grade }]);
    setSelectedStudent("");
    setGrade("");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Pagina principală pentru profesor</h1>
      <form onSubmit={handleAddGrade} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Alege un elev:</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-xl"
          >
            <option value="">-- Selectează un elev --</option>
            {students.map((student) => (
              <option key={student} value={student}>
                {student}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notă:</label>
          <input
            type="number"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-xl"
            min="1"
            max="10"
            placeholder="Introdu o notă"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Adaugă Nota
        </button>
      </form>

      {grades.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Note adăugate:</h2>
          <table className="w-full border border-gray-300 text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Elev</th>
                <th className="p-2 border">Notă</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((entry, index) => (
                <tr key={index}>
                  <td className="p-2 border">{entry.student}</td>
                  <td className="p-2 border">{entry.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
