// components/Sidebar.tsx
import { Link } from "react-router-dom";
import { useAppStore } from "../../../store/useAppStore";
import "./Sidebar.css";
import { FaWindowClose } from "react-icons/fa";

export function Sidebar() {
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);

  if (!isSidebarOpen) return null;

  return (
    <aside className="w-52">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/fruits">Fruits</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </aside>
  );
}
