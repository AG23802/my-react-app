import { useContext, useRef } from "react"
import { FruitContext } from "../../../context/FruitContext"

export function SearchBar() {
    const inputRef = useRef<HTMLInputElement>(null)
    const { setQuery } = useContext(FruitContext)!
    const handleClick = () => inputRef.current?.focus()

    return (
        <div className="card">
            <input ref={inputRef} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search..." />
            <button onClick={handleClick}>Search</button>
        </div>
    )
}