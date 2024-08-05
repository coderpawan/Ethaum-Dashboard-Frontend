import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [vendorFilter, setVendorFilter] = useState("");
  const [ratingRange, setRatingRange] = useState([0, 5]);

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on checked categories, price filter, title, vendor, and rating
        const filteredProducts = filteredProductsQuery.data.filter((product) => {
          return (
            (priceFilter === "" ||
              product.realPrice.toString().includes(priceFilter) ||
              product.realPrice <= parseInt(priceFilter, 10)) &&
            (titleFilter === "" ||
              product.title.toLowerCase().includes(titleFilter.toLowerCase())) &&
            (vendorFilter === "" ||
              product.vendor.toLowerCase().includes(vendorFilter.toLowerCase())) &&
            product.rating >= ratingRange[0] &&
            product.rating <= ratingRange[1]
          );
        });

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [
    checked,
    radio,
    filteredProductsQuery.data,
    dispatch,
    priceFilter,
    titleFilter,
    vendorFilter,
    ratingRange,
  ]);

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitleFilter(e.target.value);
  };

  const handleVendorChange = (e) => {
    setVendorFilter(e.target.value);
  };

  const handleRatingChange = (e) => {
    const min = parseInt(e.target.min, 10);
    const max = parseInt(e.target.max, 10);
    const value = parseInt(e.target.value, 10);

    if (value >= min && value <= max) {
      setRatingRange([min, value]);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex md:flex-row">
          <div className="bg-slate-800 p-3 mb-2 ml-20 fixed h-[98vh] overflow-y-scroll no-scrollbar">
            <h2 className="h4 text-center py-2 bg-slate-700 rounded-lg mb-2">
              Filter by Categories
            </h2>

            <div className="p-5 w-[15rem]">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-gradient bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="blue-checkbox"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-slate-700 rounded-lg mb-2">
              Filter by Title
            </h2>

            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter Title"
                value={titleFilter}
                onChange={handleTitleChange}
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <h2 className="h4 text-center py-2 bg-slate-700 rounded-lg mb-2">
              Filter by Vendors
            </h2>

            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter Vendor"
                value={vendorFilter}
                onChange={handleVendorChange}
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <h2 className="h4 text-center py-2 bg-slate-700 rounded-lg mb-2">
              Filter by Price
            </h2>

            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <h2 className="h4 text-center py-2 bg-slate-700 rounded-lg mb-2">
              Filter by Ratings
            </h2>

            <div className="p-5">
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={ratingRange[0]}
                onChange={(e) =>
                  setRatingRange([parseFloat(e.target.value), ratingRange[1]])
                }
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={ratingRange[1]}
                onChange={(e) =>
                  setRatingRange([ratingRange[0], parseFloat(e.target.value)])
                }
                className="w-full mt-2"
              />
              <div className="flex justify-between">
                <span>Min: {ratingRange[0]}</span>
                <span>Max: {ratingRange[1]}</span>
              </div>
              {(ratingRange[0] !== 0 || ratingRange[1] !== 5) && (
                <button
                  onClick={() => setRatingRange([0, 5])}
                  className="w-full text-sm font-medium text-red-500 dark:text-red-300 mt-2"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="p-5 pt-0">
              <button
                className="w-full border my-4"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="p-3 ml-[400px] relative">
            <h2 className="h4 text-center mb-2 ml-3 bg-blue-gradient text-black py-2 px-4 w-fit rounded-xl">
              {products?.filter((p) => p.adminApproval === true).length} Products
            </h2>
            <div className="flex flex-wrap">
              {products.length === 0 ||
              !products.some((p) => p.adminApproval) ? (
                <Loader />
              ) : (
                products
                  .filter((p) => p.adminApproval === true)
                  .map((p) => (
                    <div className="p-3" key={p._id}>
                      <ProductCard p={p} />
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
