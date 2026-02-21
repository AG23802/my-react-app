export type CartItem = {
  id?: string;
  fruitId: number;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export type CartAction =
  | { type: "INCREMENT"; payload: CartItem }
  | { type: "DECREMENT"; payload: { id: string } }
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "CHECKOUT"; payload: CartState }
  | { type: "CLEAR_CART" };

export const initialCartState: CartState = {
  items: [],
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  let existing;
  switch (action.type) {
    case "INCREMENT":
      existing = state.items.find(
        (item) => item.fruitId === action.payload.fruitId,
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.fruitId === action.payload.fruitId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            id: crypto.randomUUID(),
            fruitId: action.payload.fruitId,
            quantity: 1,
          },
        ],
      };

    case "DECREMENT":
      existing = state.items.find((item) => item.id === action.payload.id);

      if (existing && existing.quantity > 1) {
        return {
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        };
      }

      return {
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case "REMOVE":
      return {
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case "CHECKOUT":
      return {
        items: [],
      };
      
    case "CLEAR_CART":
      return {
        items: [],
      };

    default:
      return state;
  }
}
