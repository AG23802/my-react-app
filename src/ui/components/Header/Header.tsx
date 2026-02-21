import { Link } from 'react-router-dom';
import { useAppStore } from '../../../store/useAppStore';
import './Header.css'
import { GiHamburgerMenu } from "react-icons/gi"

export default function Header() {
    const toggleOverlay = useAppStore(state => state.toggleOverlay)

  return (
    <header className="p-4">
      <Link to="/">
        <h1 className="text-2xl font-bold">Fruits App</h1>
      </Link>
      <GiHamburgerMenu className="cursor-pointer" onClick={toggleOverlay} />
    </header>
  );
}