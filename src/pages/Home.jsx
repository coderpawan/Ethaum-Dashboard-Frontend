import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center -top-0 fixed bg-black w-full py-4 z-50">
            <h1 className="ml-[20rem] text-[3rem]">Special Products</h1>

            <Link
              to="/shop"
              className="bg-blue-gradient text-black font-bold rounded-full py-2 px-10 mr-[18rem] "
            >
              Shop
            </Link>
          </div>

          <div className="mt-24">
            <div className="grid grid-cols-3 gap-3 mx-32 justify-center my-[2rem]">
              {data.products.map((product) => (
                <div key={product._id} className="">
                  <Link to={`/product/${product._id}`}>
                    <Product product={product} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
