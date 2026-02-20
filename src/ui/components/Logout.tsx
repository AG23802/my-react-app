import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Logout() {
  const { logout } = useContext(UserContext);

  return (
    <div>
      <button onClick={() => logout()}>Log Out</button>
    </div>
  );
}
