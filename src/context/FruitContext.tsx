
import { createContext, useMemo, useState, type ReactNode } from "react";
import fruits from "../assets/fruits";

interface FruitContextType {
    fruits: typeof fruits
    sweetOnly: boolean;
    toggleSweetOnly: () => void;
    setQuery: (query: string) => void;
}

export const FruitContext = createContext<FruitContextType | undefined>(undefined)

export function FruitProvider({ children }: { children?: ReactNode }) {
    const [sweetOnly, setSweetOnly] = useState(false);
    const [query, setQuery] = useState("");
    const toggleSweetOnly = () => setSweetOnly((prev) => !prev);

    // ✅ This calculates the list whenever query or sweetOnly changes
    const filteredFruits = useMemo(() => {
        return fruits.filter(fruit => {
            const matchesSearch = fruit.name.toLowerCase().includes(query.toLowerCase());
            const matchesSweet = sweetOnly ? fruit.isSweet : true;
            return matchesSearch && matchesSweet;
        });
    }, [query, sweetOnly]);

    // Inside your FruitProvider
    const value = useMemo(() => ({
        fruits: filteredFruits,
        sweetOnly,
        toggleSweetOnly,
        setQuery
    }), [filteredFruits, sweetOnly]); // toggleSweetOnly and setQuery are stable (don't change)

    return (
        <FruitContext.Provider value={value}>
            {children}
        </FruitContext.Provider>
    )
}