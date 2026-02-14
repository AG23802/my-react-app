import { useEffect, useReducer } from "react"
import { cartReducer, initialCartState } from "../reducers/cartReducer"
import { useLocalStorage } from "./useLocalStorage"

// provides init state from localStorage if available
// updates localStorage whenever state changes with useEffect
export default function useCart() {
    const [storedValue, setValue] = useLocalStorage("cart", initialCartState)

    const [state, dispatch] = useReducer(cartReducer, initialCartState, (initial) => {
        if (storedValue) {
            return storedValue
        }
        return initial
    })


    useEffect(() => setValue(state), [state])


    return { state, dispatch }
}