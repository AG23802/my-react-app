import useAuth from "../../hooks/useAuth";

export default function Logout() {
  const { logout } = useAuth();

  return (
    <div>
      <button onClick={() => logout()}>Log Out</button>
    </div>
  );
}
