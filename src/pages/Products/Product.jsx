import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3 relative bg-slate-800 mt-10 rounded-xl">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[20rem] h-[20rem] rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <h2 className="flex justify-between items-center">
          <div className="text-md">{product.name}</div>
          <span className=" bg-gray-600 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full ">
            ₹ {product.price}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default Product;
