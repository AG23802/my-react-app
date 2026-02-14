import { create } from "zustand"
import type { AppState } from "./types/appState"

export const useAppStore = create<AppState>(set => ({
    user: null,
    isSidebarOpen: false,

    login: (user) => set({user}),
    logout: () => set({user: null}),

    toggleSidebar: () => set(state => ({isSidebarOpen: !state.isSidebarOpen}))
}))