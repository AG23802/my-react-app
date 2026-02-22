import { useContext } from "react";
import { FruitContext } from "../../../context/FruitContext";
import "./Cart.css";
import { IoTrashBin } from "react-icons/io5";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router";

export default function Cart() {
  const { state, dispatch } = useContext(FruitContext)!;
  const { fruits } = useContext(FruitContext)!;

  return (
    <div>
      <div className="title">Cart Page</div>

    {!!state?.items.length && state.items.length > 0 && (
      <ul className="flex fruit-list mt-8 flex flex-col gap-4 mb-8">
        {state.items.map((item) => (
          <li className="flex space-between w-full" key={item.id}>
            <div className="details flex items-center gap-4 font-bold text-lg">
              <span>{fruits.find((f) => f.id === item.fruitId)?.emoji}</span>
              <span>
                {fruits.find((f) => f.id === item.fruitId)?.name} ×{" "}
                {item.quantity}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <FaPlus size={24} onClick={() =>
                  dispatch({
                    type: "INCREMENT",
                    payload: { fruitId: item.fruitId },
                  })
                } />


              <FaMinus size={24} onClick={() =>
                  dispatch({
                    type: "DECREMENT",
                    payload: { id: item.id },
                  })
                } />

              <IoTrashBin size={24} onClick={() =>
                  dispatch({
                    type: "REMOVE",
                    payload: { id: item.id },
                  })
                } />
            </div>
          </li>
        ))}
      </ul>
      )}

      <div className="status-container warning-container">
        {state?.items.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <Link to="/checkout">
            CHECKOUT
          </Link>
        )}
      </div>
    </div>
  );
}
