import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "./firebase";

const students = ["maria@student.com", "ion@student.com", "elena@student.com", "andrei@student.com"];

export default function PaginaProfesor() {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [grade, setGrade] = useState("");
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "grades"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGrades(data);
    });

    return () => unsubscribe();
  }, []);

  const handleAddGrade = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !grade) return;

    await addDoc(collection(db, "grades"), {
      student: selectedStudent,
      grade: Number(grade),
      professor: auth.currentUser.uid,
      timestamp: serverTimestamp(),
    });

    setSelectedStudent("");
    setGrade("");
  };

  const handleDeleteGrade = async (id) => {
    await deleteDoc(doc(db, "grades", id));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Adaugă note</h1>
      <form onSubmit={handleAddGrade} className="space-y-4">
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="w-full p-3 border rounded-lg border-gray-300 text-sm"
        >
          <option value="">-- Selectează un elev --</option>
          {students.map((student) => (
            <option key={student} value={student}>
              {student}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          max="10"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="Introdu o notă"
          className="w-full p-3 border rounded-lg border-gray-300 text-sm"
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
        >
          Adaugă nota
        </button>
      </form>

      {grades.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Note adăugate:</h2>
          <table className="w-full border text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Elev</th>
                <th className="p-2 border">Notă</th>
                <th className="p-2 border">Acțiune</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((entry) => (
                <tr key={entry.id}>
                  <td className="p-2 border">{entry.student}</td>
                  <td className="p-2 border">{entry.grade}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleDeleteGrade(entry.id)}
                      className="text-red-600 hover:underline"
                    >
                      Șterge
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}