import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <div className="container justify-around items-start flex wrap mx-auto">
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-[80%]">
              <h1 className="text-2xl font-semibold mb-4 -top-0 fixed bg-black w-full py-4">
                Shopping Cart
              </h1>
              <div className="pt-16 mt-6">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-enter mb-[1rem] pb-2"
                  >
                    <div className="w-[5rem] h-[5rem]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>

                    <div className="flex-1 ml-4">
                      <Link
                        to={`/products/${item._id}`}
                        className="text-gradient font-semibold"
                      >
                        {item.title}
                      </Link>

                      <div className="mt-2 text-white">{item.vendor}</div>
                      <div className="mt-2 text-white font-bold">
                        ₹ {item.realPrice}
                      </div>
                    </div>

                    <div>
                      <button
                        className="text-red-500 mr-[5rem]"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash className="ml-[1rem] mt-[.5rem]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 w-[40rem]">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Items ({cartItems.length})
                  </h2>

                  <div className="text-2xl font-bold">
                    ₹{" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.realPrice, 0)
                      .toFixed(2)}
                  </div>

                  <button
                    className="bg-blue-gradient text-black mt-4 py-2 px-4 rounded-full text-lg w-full"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
