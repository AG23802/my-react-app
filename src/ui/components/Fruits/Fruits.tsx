import { useContext } from "react"
import { FruitContext } from "../../../context/FruitContext"
import "./Fruits.css"
import { Link } from "react-router-dom"

export default function Fruits() {
    const { fruits, sweetOnly } = useContext(FruitContext)!
    return <>

        <span>Fruits Component</span>
        <div className="fruit-list">
            {fruits
                .filter(fruit => sweetOnly ? fruit.isSweet : true)
                .map(fruit => {
                    return <div key={fruit.id}>
                        <Link to={`/fruits/${fruit.id}`}>
                        <span>{fruit.emoji}</span>
                        <span>{fruit.name}</span>
                        <span> (Stock: {fruit.stock})</span>
                        </Link>
                    </div>
                })}

            
        </div>
    </>
}