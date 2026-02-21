// components/Overlay.tsx
import { Link } from "react-router-dom";
import { useAppStore } from "../../../store/useAppStore";
import { IoClose } from "react-icons/io5"; 
import "./Overlay.css";

export function Overlay() {
  const isOverlayOpen = useAppStore((state) => state.isOverlayOpen);
  const toggleOverlay = useAppStore((state) => state.toggleOverlay);

  if (!isOverlayOpen) return null;

  return (
    <div className="full-page-overlay">
      {/* Your Specific Links Centered */}
      <nav className="overlay-nav-links">
        <Link to="/" onClick={toggleOverlay}>Home</Link>
        <Link to="/fruits" onClick={toggleOverlay}>Fruits</Link>
        <Link to="/cart" onClick={toggleOverlay}>Cart</Link>
      </nav>
    </div>
  );
}