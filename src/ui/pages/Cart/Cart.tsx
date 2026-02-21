import { useContext } from "react";
import { FruitContext } from "../../../context/FruitContext";
import useCheckout from "../../../hooks/useCheckout";
import "./Cart.css";
import { IoTrashBin } from "react-icons/io5";
import { FaPlus, FaMinus } from "react-icons/fa";


export default function Cart() {
  const { state, dispatch } = useContext(FruitContext)!;
  const { fruits } = useContext(FruitContext)!;
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
      <h2>Cart Page</h2>

      <ul className="flex fruit-list mt-8 flex flex-col gap-4 mb-8">
        {state?.items.map((item) => (
          <li className="flex space-between w-100" key={item.id}>
            <div className="details">
              <span>{fruits.find((f) => f.id === item.fruitId)?.emoji}</span>
              <span>
                {fruits.find((f) => f.id === item.fruitId)?.name} ×{" "}
                {item.quantity}
              </span>
            </div>
            <div className="flex align-center gap-2">
              <FaPlus onClick={() =>
                  dispatch({
                    type: "INCREMENT",
                    payload: { fruitId: item.fruitId },
                  })
                } />


              <FaMinus onClick={() =>
                  dispatch({
                    type: "DECREMENT",
                    payload: { id: item.id },
                  })
                } />

              <IoTrashBin onClick={() =>
                  dispatch({
                    type: "REMOVE",
                    payload: { id: item.id },
                  })
                } />
            </div>
          </li>
        ))}
      </ul>

      <div>
        {state?.items.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <button disabled={isPending} onClick={() => mutate(state)}>
            CHECKOUT
          </button>
        )}
      </div>
    </div>
  );
}
