import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
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
    <div
      key={product.id}
      className="w-full border rounded-lg shadow bg-gray-800 border-gray-700"
    >
      <div className="relative">
        <Link to={`/products/${product._id}`}>
          <img
            className="p-8 rounded-2xl w-full h-[50%]"
            src={product.image}
            alt="product"
          />
        </Link>
        <HeartIcon product={product} className="absolute top-2 right-2" />
      </div>
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-white">
          {product.title}
        </h5>
        <div className="text-[14px] font-semibold tracking-tight text-slate-400 line-clamp-3">
          {product.description}
        </div>

        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {renderStars(product.rating)}
            <span className="text-sm font-semibold px-3 py-1 rounded bg-slate-600 text-white">
              {product.reviews.length} reviews
            </span>
          </div>
        </div>

        <span className="text-3xl font-bold text-white">
          ₹<span className="ml-2">{product.realPrice}</span>
        </span>

        <div className="flex items-center justify-between mt-5">
          <Link
            to={`/products/${product._id}`}
            className="text-slate-800 w-[45%] bg-blue-gradient focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-gradient hover:bg-blue-700 focus:ring-blue-800"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
