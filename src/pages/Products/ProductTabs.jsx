import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="justify-center items-center rounded-2xl mb-20">
      <section className="rounded-2xl w-[600px] relative left-[150px] bg-gray-800 flex justify-around p-4">
        <div
          className={`cursor-pointer text-lg ${
            activeTab === 1 ? "text-gradient" : "text-white"
          }`}
          onClick={() => handleTabClick(1)}
        >
          Write Your Review
        </div>
        <div
          className={`cursor-pointer text-lg ${
            activeTab === 2 ? "text-gradient" : "text-white"
          }`}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </div>
        <div
          className={`cursor-pointer text-lg ${
            activeTab === 3 ? "text-gradient" : "text-white"
          }`}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </div>
      </section>

      <section className="mt-20 w-[900px] hide-scrollbar pt-5 px-10 h-[40vh] overflow-y-auto p-4 bg-gray-900 rounded-lg">
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form
                onSubmit={submitHandler}
                className="p-4 bg-gray-800 rounded-lg"
              >
                <div className="my-2">
                  <label
                    htmlFor="rating"
                    className="block text-xl mb-2 text-white"
                  >
                    Rating
                  </label>
                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded-lg xl:w-[40rem] text-black"
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>
                <div className="my-2">
                  <label
                    htmlFor="comment"
                    className="block text-xl mb-2 text-white"
                  >
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    rows="3"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg xl:w-[40rem] text-black"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-blue-gradient text-black py-2 px-4 rounded-lg"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p className="text-white">
                Please <Link to="/login">sign in</Link> to write a review
              </p>
            )}
          </div>
        )}

        {activeTab === 2 && (
          <>
            <div>
              {product.reviews.length === 0 && (
                <p className="text-white">No Reviews</p>
              )}
            </div>
            <div>
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-800 p-4 rounded-lg mb-5"
                >
                  <div className="flex justify-between">
                    <strong className="text-white">{review.name}</strong>
                    <p className="text-white">
                      {review.createdAt?.substring(0, 10)}
                    </p>
                  </div>
                  <p className="my-4 text-white">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 3 && (
          <section className=" justify-center mx-3  grid grid-cols-2 gap-3">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <div
                  key={product._id}
                  className="p-4 m-4 bg-slate-600 rounded-xl"
                >
                  <Link to={`/product/${product._id}`}>
                    <SmallProduct product={product} />
                  </Link>
                </div>
              ))
            )}
          </section>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
