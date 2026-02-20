
import { createContext, useMemo, type Dispatch, type ReactNode } from "react"
import { initialCartState } from "../reducers/cartReducer"
import useCart from "../hooks/useCart"
import useSearchFilters from "../hooks/useSearchFilters"
import type { Fruit } from "../types/fruit"

interface FruitContextType {
    fruits: Fruit[]
    sweetOnly: boolean
    toggleSweetOnly: () => void
    setQuery: (query: string) => void
    state?: typeof initialCartState
    dispatch: Dispatch<any>
}

export const FruitContext = createContext<FruitContextType | undefined>(undefined)

export function FruitProvider({ children }: { children?: ReactNode }) {
    const { setQuery, sweetOnly, setSweetOnly, filteredFruits } = useSearchFilters()
    const toggleSweetOnly = () => setSweetOnly((prev) => !prev)
    const { state, dispatch } = useCart()

    // Inside your FruitProvider
    const value = useMemo(() => ({
        fruits: filteredFruits,
        sweetOnly,
        toggleSweetOnly,
        setQuery,
        state,
        dispatch
    }), [filteredFruits, sweetOnly, state]) // toggleSweetOnly and setQuery are stable (don't change)


    return (
        <FruitContext.Provider value={value}>
            {children}
        </FruitContext.Provider>
    )
}