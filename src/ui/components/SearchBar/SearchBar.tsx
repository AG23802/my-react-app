import { useContext, useRef } from "react";
import { FruitContext } from "../../../context/FruitContext";

export function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setQuery } = useContext(FruitContext)!;
  const { toggleSweetOnly } = useContext(FruitContext)!;

  return (
    <div className="card">
      <input
        ref={inputRef}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search..."
      />
      <button onClick={() => toggleSweetOnly()}>Toggle sweet only</button>
    </div>
  );
}
