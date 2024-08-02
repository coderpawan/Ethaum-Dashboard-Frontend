import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="ml-[10rem]">
      <div className="text-lg font-bold ml-[3rem] -top-0 fixed left-32 w-full py-5 z-50 bg-black">
        FAVORITE PRODUCTS
      </div>

      <div className="flex flex-wrap py-20">
        {favorites.map((product) => (
          <Link to={`/product/${product._id}`}>
            <Product key={product._id} product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
