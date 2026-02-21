import useUser from "../../hooks/useUser";

export default function Logout() {
  const { logout } = useUser();

  return (
    <div>
      <button onClick={() => logout()}>Log Out</button>
    </div>
  );
}
