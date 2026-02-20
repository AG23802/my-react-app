import {
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { UserContext } from "../../context/UserContext";
import { ImSpinner } from "react-icons/im";

// admin
// 123456
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error } = useContext(UserContext);

  const usernameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(sum)
    login(username, password);
  };

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        className="block"
        ref={usernameRef}
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
          <ImSpinner className="animate-spin text-blue-500 w-6 h-6" />
        ) : (
          <button>Log In</button>
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
  );
}
