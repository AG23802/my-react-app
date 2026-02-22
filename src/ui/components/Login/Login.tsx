import { useState, type FormEvent } from "react";
import { ImSpinner } from "react-icons/im";
import "./Login.css";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

// admin
// 123456
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, logout, error } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <div>
      <form className="flex flex-col gap-4 m-4" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          className="block"
          placeholder="Username"
          // autoFocus
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="block"
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-center">
          {loading ? (
            <ImSpinner className="animate-spin text-teal-400 w-6 h-6" />
          ) : (
            <button disabled={loading} className="mt-8">Log In</button>
          )}
          {error && (
            <div
              className="border border-gray-500 rounded"
              style={{ color: "red" }}
            >
              {error}
            </div>
          )}
        </div>
      </form>

      <Link
        to="/register"
        className="text-sm text-blue-500 hover:underline mt-4"
      >
        Don't have an account? Register
      </Link>
    </div>
  );
}
