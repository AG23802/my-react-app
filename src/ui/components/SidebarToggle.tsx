import { useAppStore } from "../../store/useAppStore"
import { GiHamburgerMenu } from "react-icons/gi"
import { RxHamburgerMenu } from "react-icons/rx";

export function SidebarToggle() {
  const isSidebarOpen = useAppStore(state => state.isSidebarOpen)
  const toggleSidebar = useAppStore(state => state.toggleSidebar)

  return (
    isSidebarOpen ? <GiHamburgerMenu className="cursor-pointer" onClick={toggleSidebar} /> : <RxHamburgerMenu className="cursor-pointer" onClick={toggleSidebar} />
  )
}