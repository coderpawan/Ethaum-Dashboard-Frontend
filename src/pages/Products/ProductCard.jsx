import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isInCart = cartItems.some((item) => item._id === p._id);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

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
    <div className="max-w-sm relative bg-[#1A1A1A] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <section className="relative">
        <Link to={`/products/${p._id}`}>
          <span className="absolute bottom-3 right-3 bg-blue-gradient text-black text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">
            {p?.vendor}
          </span>
          <img
            className="cursor-pointer w-full"
            src={p.image}
            alt={p.title}
            style={{ height: "170px", objectFit: "cover" }}
          />
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="p-5">
        <div className="flex justify-between">
          <h5 className="mb-2 text-xl text-white dark:text-white">{p?.title}</h5>
          <p className="font-semibold text-white bg-gray-600 px-2 h-fit rounded-full">
            {p?.realPrice?.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>

        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {renderStars(p.rating)}
            <span className="text-sm font-semibold px-3 py-1 rounded bg-slate-600 text-white">
              {p.reviews.length} reviews
            </span>
          </div>
        </div>

        <p className="mb-3 font-normal text-[#CFCFCF]">
          {p?.description?.substring(0, 60)} ...
        </p>

        <section className="flex justify-between items-center">
          <Link
            to={`/products/${p._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className={`p-2 rounded-full ${isInCart ? "bg-yellow-400" : ""}`}
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
