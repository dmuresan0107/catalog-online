import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase";

export default function PaginaStudent() {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "grades"), (snapshot) => {
      const userEmail = auth.currentUser?.email;

      const filteredGrades = snapshot.docs
        .map((doc) => doc.data())
        .filter((entry) => entry.student === userEmail);

      setGrades(filteredGrades);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Notele tale</h1>
      {grades.length > 0 ? (
        <table className="w-full border text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Notă</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((entry, index) => (
              <tr key={index}>
                <td className="p-2 border">{entry.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nu ai nicio notă înregistrată.</p>
      )}
    </div>
  );
}