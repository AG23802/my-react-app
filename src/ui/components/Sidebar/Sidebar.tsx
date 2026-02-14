// components/Sidebar.tsx
import { Link } from "react-router-dom"
import { useAppStore } from "../../../store/useAppStore"
import './Sidebar.css';

export function Sidebar() {
    const isSidebarOpen = useAppStore(state => state.isSidebarOpen)
    const toggleSidebar = useAppStore(state => state.toggleSidebar)

    if (!isSidebarOpen) return null

    return (
        <aside
        >
            <button onClick={() => {
                // toggleSidebar()
            }}>Close</button>
            <nav>
                <Link to="/register">Register</Link>
                <Link to="/">Home</Link>
                <Link to="/fruits">Fruits</Link>
                <Link to="/cart">Cart</Link>
            </nav>
        </aside>
    )
}