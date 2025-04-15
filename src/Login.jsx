import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: email,
          role: role,
        });
      }

      const finalSnap = await getDoc(userRef);
      const userData = finalSnap.data();

      if (userData?.role) {
        onLogin(userData.role);
      } else {
        setError("Nu s-a găsit niciun rol pentru acest utilizator.");
      }
    } catch (err) {
      setError("Email sau parolă incorectă.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Autentificare</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg border-gray-300 text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Parolă"
          className="w-full p-3 border rounded-lg border-gray-300 text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 border rounded-lg border-gray-300 text-sm"
        >
          <option value="student">Student</option>
          <option value="professor">Profesor</option>
        </select>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
        >
          Login
        </button>
      </form>
    </div>
  );
}