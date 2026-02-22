import { useContext } from "react";
import useCheckout from "../../hooks/useCheckout";
import { FruitContext } from "../../context/FruitContext";

export default function Checkout() {
  const { mutate, isPending, isSuccess, isError, reset } = useCheckout();
  const { state, dispatch } = useContext(FruitContext)!;

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
        <h2>Thank you for your order!</h2>
        <div>
          <button onClick={() => reset()}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="title">Checkout Page</div>
      <div className="status-container warning-container">
        {state?.items.length === 0 ? (
          <p>Cart is empty</p>
        ) : (<button disabled={isPending} onClick={() => mutate(state)}>
          CHECKOUT
        </button>)}
      </div>
    </div>
  );
}