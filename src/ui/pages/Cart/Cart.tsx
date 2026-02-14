import { useContext } from "react"
import { FruitContext } from "../../../context/FruitContext"
import useCheckout from "../../../hooks/useCheckout";
import './Cart.css';

export default function Cart() {
    const { state, dispatch } = useContext(FruitContext)!
    const { fruits } = useContext(FruitContext)!
    const { mutate, isPending } = useCheckout();

    console.log("Cart state:", state);
    console.log("Fruits data:", fruits);

    return (
        <div>
            <h2 className="text-3xl font-bold underline">Cart Page</h2>
            {state?.items.length === 0 ? <p>Cart is empty</p> : <button disabled={isPending} onClick={() => mutate(state)}>CHECKOUT</button>}

            <ul>
                {state?.items.map(item => (
                    <li key={item.id}>
                        <div className="details">
                            <span>{fruits.find(f => f.id === item.fruitId)?.emoji}</span>
                            <span>{fruits.find(f => f.id === item.fruitId)?.name} × {item.quantity}</span>
                        </div>
                        <div className="buttons">
                            <button
                                onClick={() =>
                                    dispatch({
                                        type: 'INCREMENT',
                                        payload: { fruitId: item.fruitId },
                                    })
                                }
                            >
                                +
                            </button>

                            <button
                                onClick={() =>
                                    dispatch({
                                        type: 'DECREMENT',
                                        payload: { id: item.id },
                                    })
                                }
                            >
                                -
                            </button>

                            <button
                                onClick={() =>
                                    dispatch({
                                        type: 'REMOVE',
                                        payload: { id: item.id },
                                    })
                                }
                            >
                                REMOVE
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}