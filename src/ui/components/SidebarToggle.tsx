import { useAppStore } from "../../store/useAppStore"

export function SidebarToggle() {
  const isSidebarOpen = useAppStore(state => state.isSidebarOpen)
  const toggleSidebar = useAppStore(state => state.toggleSidebar)

  return (
    <button onClick={toggleSidebar}>
      {isSidebarOpen ? 'Close' : 'Open'} Sidebar
    </button>
  )
}