import { useParams } from "react-router-dom"
import { FruitContext } from "../../context/FruitContext"
import { useContext } from "react"

export default function FruitDetails() {
    const {dispatch, fruits}  = useContext(FruitContext)!
    const { id } = useParams()

    const fruit = fruits.find(fruit => fruit.id === Number(id))

    if (!fruit) {
        return <div>Fruit not found</div>
    }

  return (
    <>
    <div>Fruit Details Page for ID: {id}</div>

    <span>{fruit.details}</span>


    <button onClick={() => dispatch({ type: 'INCREMENT', payload: { fruitId: fruit.id } })}>
        Add to Cart
    </button>

    
</>
  )
}