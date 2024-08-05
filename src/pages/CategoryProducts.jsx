import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useParams } from "react-router-dom";

import {
  setProducts,
  setChecked,
  setRadio,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const CategoryProducts = () => {
  const dispatch = useDispatch();
  const { products, checked, radio } = useSelector((state) => state.shop);

  const { categoryId } = useParams(); // Retrieve category ID from URL
  const [priceFilter, setPriceFilter] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [ratingRange, setRatingRange] = useState([0, 5]);

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!filteredProductsQuery.isLoading) {
      const filteredProducts = filteredProductsQuery.data
        .filter((product) => product.category === categoryId) // Filter by categoryId
        .filter((product) => product.adminApproval) // Filter by adminApproval
        .filter((product) =>
          priceFilter
            ? product.realPrice.toString().includes(priceFilter) ||
              product.realPrice <= parseInt(priceFilter, 10)
            : true
        )
        .filter((product) =>
          selectedTag
            ? product.tags.some((tag) => JSON.parse(tag).includes(selectedTag))
            : true
        )
        .filter((product) =>
          titleFilter
            ? product.title.toLowerCase().includes(titleFilter.toLowerCase())
            : true
        )
        .filter(
          (product) =>
            product.rating >= ratingRange[0] && product.rating <= ratingRange[1]
        );
      dispatch(setProducts(filteredProducts));
    }
  }, [
    filteredProductsQuery.data,
    dispatch,
    priceFilter,
    categoryId,
    checked,
    radio,
    selectedTag,
    titleFilter,
    ratingRange,
  ]);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const tags = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.filter(
            (product) =>
              product.category === categoryId && product.adminApproval
          ) // Filter by categoryId and adminApproval
          .flatMap((product) => JSON.parse(product.tags[0]))
          .filter((tag) => ["Top Deal", "Featured", "Popular"].includes(tag)) // Example tags
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const handleResetFilter = (filterType) => {
    switch (filterType) {
      case "tag":
        setSelectedTag("");
        break;
      case "price":
        setPriceFilter("");
        break;
      case "title":
        setTitleFilter("");
        break;
      case "rating":
        setRatingRange([0, 5]);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex md:flex-row">
          <div className="bg-slate-800 p-3 mb-2 ml-20 fixed h-[95vh] overflow-auto">
            <h2 className="h4 text-center py-2 bg-slate-700 rounded-lg mb-2">
              Filter by Title
            </h2>

            <div className="p-5">
              <input
                type="text"
                placeholder="Enter Title"
                value={titleFilter}
                onChange={(e) => setTitleFilter(e.target.value)}
                className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />
              {titleFilter && (
                <button
                  onClick={() => handleResetFilter("title")}
                  className="w-full text-sm font-medium text-red-500 dark:text-red-300 mt-2"
                >
                  Remove
                </button>
              )}
            </div>

            <h2 className="h4 text-center py-2 bg-slate-700 rounded-lg mb-2">
              Filter by Tags
            </h2>

            <div className="p-5">
              {tags.map((tag) => (
                <div key={tag} className="flex items-center mr-4 mb-5">
                  <input
                    type="radio"
                    id={tag}
                    name="tag"
                    checked={selectedTag === tag}
                    onChange={() => handleTagClick(tag)}
                    className="w-4 h-4 text-gradient bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={tag}
                    className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    {tag}
                  </label>
                  {selectedTag === tag && (
                    <button
                      onClick={() => handleResetFilter("tag")}
                      className="ml-2 text-sm font-medium text-red-500 dark:text-red-300"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
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
              {priceFilter && (
                <button
                  onClick={() => handleResetFilter("price")}
                  className="w-full text-sm font-medium text-red-500 dark:text-red-300 mt-2"
                >
                  Remove
                </button>
              )}
            </div>

            <h2 className="h4 text-center py-2 bg-slate-700 rounded-lg mb-2">
              Filter by Rating
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
                  onClick={() => handleResetFilter("rating")}
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
                Reset All
              </button>
            </div>
          </div>

          <div className="p-3 ml-[400px] relative">
            <h2 className="h4 text-center mb-2 ml-3 bg-blue-gradient text-black py-2 px-4 w-fit rounded-xl">
              {products?.filter((p) => p.adminApproval === true).length}{" "}
              Products
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
export default CategoryProducts;
