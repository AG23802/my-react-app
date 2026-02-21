import { useContext, useRef } from "react";
import { FruitContext } from "../../../context/FruitContext";
import "./SearchBar.css"

export function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setQuery } = useContext(FruitContext)!;
  const { toggleSweetOnly } = useContext(FruitContext)!;

  return (
    <div className="search-container">
      <input
        ref={inputRef}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search..."
      />
      <button onClick={() => toggleSweetOnly()}>Sweet only</button>
    </div>
  );
}
