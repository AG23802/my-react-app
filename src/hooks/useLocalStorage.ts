import { useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T): [T | null, (value: T | null) => void, () => void] {
    // 1. Tell useState it can hold T OR null
    const [storedValue, setStoredValue] = useState<T | null>(() => {
        if (typeof window === 'undefined') {    
            return initialValue
        }

        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error)
            return initialValue
        }
    })

    const setValue = (value: T | null) => {    
        try {
            // 2. Handle the "Function" case carefully with types
            const valueToStore = value instanceof Function 
                ? (value as (prev: T | null) => T | null)(storedValue) 
                : value    
            
            setStoredValue(valueToStore)
            
            if (typeof window !== 'undefined') {
                if (valueToStore === null) {
                    window.localStorage.removeItem(key)
                } else {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore))
                }
            }
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error)
        }       
    }

    const removeValue = () => {
        try {
            // 3. This will now work because setValue accepts T | null
            setValue(null);
        } catch (error) {
            console.warn('Error removing localStorage key:', key, error);
        }
    };

    return [storedValue, setValue, removeValue]
}