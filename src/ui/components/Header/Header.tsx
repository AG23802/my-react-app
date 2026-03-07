import { Link } from "react-router-dom";
import { useAppStore } from "../../../store/useAppStore";
import "./Header.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCartShopping } from "react-icons/fa6";

export default function Header() {
  const toggleOverlay = useAppStore((state) => state.toggleOverlay);
  const env = import.meta.env.VITE_ENV;

  return (
    <header className="p-4">
      <Link className="relative" to="/">
        <h1 className="text-2xl font-bold">Fruits App</h1>
        <span className="badge">{env}</span>
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/cart">
          <FaCartShopping size={24} />
        </Link>
        <GiHamburgerMenu
          size={32}
          className="cursor-pointer"
          onClick={toggleOverlay}
        />
      </div>
    </header>
  );
}
