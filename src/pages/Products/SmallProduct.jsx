import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] ">
      <div className="relative ">
        <img
          src={product.image}
          alt={product.name}
          className="h-auto rounded w-[12rem] h-[12rem]"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <h2 className="flex justify-between items-center">
          <div>{product.name}</div>
          <span className="bg-gray-800 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ">
            ₹ {product.price}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default SmallProduct;
