import {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
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

  const numbers = [1, 2, 3, 4, 5];

  const sum = useMemo(() => {
    // console.log("Calculating sum...");
    return numbers.reduce((a, b) => a + b, 0);
  }, [numbers]); // only recalculates if numbers array changes

  // useLayoutEffect(() => {
  //   console.log('Layout Effect');
  //   if (usernameRef.current) {
  //     usernameRef.current.style.border = '2px solid red';
  //   }
  // }, []);

  // Runs only once when the component mounts.
  // Cleanup runs only on unmount.
  // This is similar to Angular’s ngOnInit + ngOnDestroy.
  // useEffect(() => {
  //   console.log('Runs once on mount');
  //   return () => console.log('Cleanup on unmount');
  // }, []);

  // Runs after every render.
  // Cleanup runs before the next render.
  // useEffect(() => {
  //   console.log('Runs on every render');
  // });

  // Runs on mount and whenever dep1 or dep2 changes.
  // Cleanup runs before the effect re-runs or on unmount.
  // useEffect(() => {
  //   console.log('Runs when dep1 or dep2 changes');
  //   return () => console.log('Cleanup before next run or unmount');
  // }, [username, password]);

  // <input autoFocus />

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
