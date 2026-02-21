import { useParams } from "react-router-dom";
import { FruitContext } from "../../context/FruitContext";
import { useContext } from "react";
import { FaCartPlus } from "react-icons/fa";

export default function FruitDetails() {
  const { dispatch, fruits } = useContext(FruitContext)!;
  const { id } = useParams();

  const fruit = fruits.find((fruit) => fruit.id === Number(id));

  if (!fruit) {
    return <div>Fruit not found</div>;
  }

  return (
    <>
      <div>Fruit Details Page for ID: {id}</div>

      <div className="border border-solid border-gray-300 rounded-md p-2 m m-4">
        {fruit.details}
      </div>

      <div className="flex justify-center">
        <FaCartPlus
          size={24}
          onClick={() =>
            dispatch({ type: "INCREMENT", payload: { fruitId: fruit.id } })
          }
        />
      </div>
    </>
  );
}
