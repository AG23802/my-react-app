import { useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void, () => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
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

    const setValue = (value: T) => {    
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value    
            setStoredValue(valueToStore)
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore))
            }
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error)
        }       
    }

    const removeValue = () => {
    try {
      localStorage.removeItem(key);
      setValue(null);
    } catch (error) {
      console.warn('Error removing localStorage key:', key, error);
    }
  };

    return [storedValue, setValue, removeValue]
}