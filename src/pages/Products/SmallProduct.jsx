import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-400"}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.207 3.684a1 1 0 00.95.691h3.868c.969 0 1.371 1.24.588 1.81l-3.13 2.26a1 1 0 00-.364 1.118l1.208 3.684c.3.92-.755 1.688-1.54 1.118l-3.13-2.26a1 1 0 00-1.175 0l-3.13 2.26c-.784.57-1.838-.198-1.54-1.118l1.208-3.684a1 1 0 00-.364-1.118l-3.13-2.26c-.783-.57-.38-1.81.588-1.81h3.868a1 1 0 00.95-.691L9.049 2.927z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className=" p-3 relative bg-slate-800 rounded-xl">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="h-auto rounded w-[12rem] h-[12rem]"
        />
        <HeartIcon product={product} className="absolute top-2 right-2" />
      </div>

      <div className="p-4">
        <h2 className="flex justify-between items-center">
          <div className="text-md text-white">{product.title}</div>
          <span className="bg-gray-600 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ">
            ₹ {product.realPrice}
          </span>
        </h2>
        <div className="text-[14px] font-semibold tracking-tight text-slate-400 line-clamp-3 mt-2">
          {product.description}
        </div>
        <div className="flex items-center mt-2.5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {renderStars(product.rating)}
            <span className="text-sm font-semibold px-3 py-1 rounded bg-slate-600 text-white">
              {product.reviews.length} reviews
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
