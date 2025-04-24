import { useState } from "react";
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const docRef = doc(db, "users", result.user.uid);
      const docSnap = await getDoc(docRef);

      // Dacă utilizatorul nu există, îl adăugăm cu rol student
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          email: result.user.email,
          role: "student",
        });
      }

      onLogin(); // va fi tratat de App.jsx
    } catch (err) {
      alert("Autentificare eșuată. Încearcă din nou.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", result.user.uid), {
        email: result.user.email,
        role: "student",
      });
      onLogin();
    } catch (err) {
      alert("Înregistrare eșuată. Încearcă alt email.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-xl shadow space-y-4">
      <h1 className="text-xl font-semibold">Autentificare Catalog</h1>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Parolă"
        className="w-full p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Login
      </button>
      <button onClick={handleRegister} className="w-full bg-gray-300 text-black p-2 rounded hover:bg-gray-400">
        Înregistrare (student)
      </button>
    </div>
  );
}