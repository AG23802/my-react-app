import { useContext } from "react";
import { FruitContext } from "../../../context/FruitContext";
import "./Fruits.css";

export default function Fruits() {
    const { fruits, sweetOnly, toggleSweetOnly } = useContext(FruitContext)!;
    return <>

        <span>Fruits Component</span>
        <div className="fruit-list">
            {fruits
                .filter(fruit => sweetOnly ? fruit.isSweet : true)
                .map(fruit => {
                    return <div key={fruit.id}>
                        <span>{fruit.emoji}</span>
                        <span>{fruit.name}</span>
                        <span> (Stock: {fruit.stock})</span>
                    </div>
                })}

            
        </div>
        <button onClick={() => toggleSweetOnly()}>Toggle sweet only</button>
    </>
}