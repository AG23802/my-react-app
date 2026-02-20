import { useContext } from "react"
import { FruitContext } from "../../../context/FruitContext"
import useCheckout from "../../../hooks/useCheckout";
import './Cart.css';

export default function Cart() {
    const { state, dispatch } = useContext(FruitContext)!
    const { fruits } = useContext(FruitContext)!
    const { mutate, isPending, isSuccess, isError, reset } = useCheckout();

    if (isError) {
        return (
            <div className="status-container error-container">
                <h2>Checkout failed. Please try again.</h2>
                <button onClick={() => reset()}>Close</button>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="status-container success-container">
                <h2>Thank you for your order! 🍎</h2>
                <div>
                    <button onClick={() => reset()}>Close</button>
                </div>
            </div>
        );
    }

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