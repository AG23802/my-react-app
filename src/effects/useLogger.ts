import { useEffect } from "react"

export default function useLogger(count: number) {
    useEffect(() => {
        console.log(`Count changed: ${count}`)
    }, [count]) // dependency array
}