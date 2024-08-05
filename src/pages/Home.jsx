import { Link } from "react-router-dom";
import { useAllProductsQuery } from "../redux/api/productApiSlice";
import { useReadCategoryMutation } from "../redux/api/categoryApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "./Products/Product";
import { useState, useEffect } from "react";

const Home = () => {
  const { data, isLoading, isError } = useAllProductsQuery();
  const [
    readCategory,
    {
      isLoading: isCategoryLoading,
      isError: isCategoryError,
    },
  ] = useReadCategoryMutation();

  const [categoryNames, setCategoryNames] = useState({});

  const products = data || [];

  // Group products by category using a unique identifier
  const groupedProducts = products.reduce((acc, product) => {
    if (product.adminApproval) {
      const categoryId = product.category._id || product.category.id || product.category; // Adjust based on your data structure
      if (!acc[categoryId]) {
        acc[categoryId] = [];
      }
      acc[categoryId].push(product);
    }
    return acc;
  }, {});

  // Fetch category names when component mounts or products change
  useEffect(() => {
    const fetchCategoryNames = async () => {
      const uniqueCategories = new Set(
        products.map((product) => product.category._id || product.category.id || product.category) // Adjust based on your data structure
      );

      const names = {};
      for (let categoryId of uniqueCategories) {
        try {
          const response = await readCategory(categoryId).unwrap();
          names[categoryId] = response.name; // Adjust according to the response structure
        } catch (error) {
          console.error("Error fetching category name:", error);
        }
      }

      setCategoryNames(names);
    };

    if (products.length > 0) {
      fetchCategoryNames();
    }
  }, [products, readCategory]);

  return (
    <>
      {isLoading ? (
        <Loader className="ml-20" />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.error}
        </Message>
      ) : isCategoryLoading ? (
        <Loader className="ml-20" />
      ) : isCategoryError ? (
        <Message variant="danger">
          {isCategoryError?.data?.message || isCategoryError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center -top-0 fixed bg-black w-full py-4 z-50">
            <h1 className="ml-[20rem] text-[3rem] text-white">
              Explore All Products
            </h1>

            <Link
              to="/shop"
              className="bg-blue-gradient text-black font-bold rounded-full py-2 px-10 mr-[18rem]"
            >
              Shop
            </Link>
          </div>
          <div className="mt-24 ml-20">
            {Object.entries(groupedProducts).map(([categoryId, products]) => (
              <div
                key={categoryId}
                className="mb-8 bg-gray-700 py-10 px-16 mx-16 rounded-2xl"
              >
                <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-200">
                  Explore {categoryNames[categoryId] || "Category"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {products.slice(0, 3).map((product) => (
                    <div
                      key={product._id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md w-[20rem]"
                    >
                      <Product product={product} />
                    </div>
                  ))}
                </div>
                <Link to={`/categoryproduct/${categoryId}`} className="mt-10">
                  <div className="justify-center text-center mb-5">
                    <button
                      type="button"
                      className="text-slate-800 mt-10 justify-center bg-blue-gradient font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                    >
                      Discover More
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
