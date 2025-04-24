import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

import Login from "./Login";
import PaginaProfesor from "./Professors";
import PaginaStudent from "./PaginaStudent";

export default function App() {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 🔄 încercăm să luăm rolul din Firestore
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        const data = snap.data();
        if (data?.role) {
          setRole(data.role);
        }
      } else {
        setRole("");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => setRole(""));
  };

  if (loading) return <div className="text-center mt-20">Se încarcă...</div>;

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      {!role ? (
        <Login onLogin={() => setLoading(true)} />
      ) : (
        <>
          <button
            onClick={handleLogout}
            className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow"
          >
            Logout
          </button>
          {role === "professor" ? <PaginaProfesor /> : <PaginaStudent />}
        </>
      )}
    </div>
  );
}