import type { User } from "./user"

export type AppState = {
    user: User | null
    isSidebarOpen: boolean
    login: (user: User) => void
    logout: () => void
    toggleSidebar: () => void
}