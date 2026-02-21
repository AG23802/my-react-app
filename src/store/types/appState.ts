import type { User } from "./user"

export type AppState = {
    user: User | null
    isOverlayOpen: boolean
    login: (user: User) => void
    logout: () => void
    toggleOverlay: () => void
}