import { useMemo, useState } from "react"
import useGetApi from "./useGetApi"

export default function useSearchFilters() {
    const [sweetOnly, setSweetOnly] = useState(false)
    const [query, setQuery] = useState("")
    const { data } = useGetApi()

    console.log("useSearchFilters - data:", data);

    const toggleSweetOnly = () => setSweetOnly((prev) => !prev)

    // ✅ This calculates the list whenever query or sweetOnly changes
    const filteredFruits = useMemo(() => {
        return data?.filter(fruit => {
            const matchesSearch = fruit.name.toLowerCase().includes(query.toLowerCase())
            const matchesSweet = sweetOnly ? fruit.isSweet : true
            return matchesSearch && matchesSweet
        }) ?? []
    }, [data, query, sweetOnly])

    return { query, sweetOnly, filteredFruits, toggleSweetOnly, setQuery, setSweetOnly }
}