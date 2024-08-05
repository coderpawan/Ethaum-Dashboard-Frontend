import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
// Auth
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import SellerRoute from "./pages/Seller/SellerRoute.jsx";
import Profile from "./pages/User/Profile.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import CreateProduct from "./pages/Seller/CreateProduct.jsx";
import AllProducts from "./pages/Seller/AllProducts.jsx";
import ProductUpdate from "./pages/Seller/ProductUpdate.jsx";
import SellerOrders from "./pages/Seller/SellerOrders.jsx";
import Home from "./pages/Home.jsx";
import Transactions from "./pages/Transactions.jsx";
import Favorites from "./pages/Products/Favorites.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";
import Shipping from "./pages/Orders/Shipping.jsx";
import PlaceOrder from "./pages/Orders/PlaceOrder.jsx";
import Order from "./pages/Orders/Order.jsx";
import OrderList from "./pages/Admin/OrderList.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import ProductApprovalList from "./pages/Admin/ProductApprovalList.jsx";
import ProductApproval from "./pages/Admin/ProductApproval.jsx";
import CategoryProducts from "./pages/CategoryProducts.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/favorite" element={<Favorites />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/categoryproduct/:categoryId" element={<CategoryProducts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="transactions" element={<Transactions />} />
      </Route>

      <Route path="/Seller" element={<SellerRoute />}>
        <Route path="createproduct" element={<CreateProduct />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="orderlist" element={<SellerOrders />} />
        {/* <Route path="productlist/:pageNumber" element={<CreateProduct />} /> */}
        <Route path="product/update/:_id" element={<ProductUpdate />} />
      </Route>
      <Route path="/Admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="orderlist" element={<OrderList />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="approvallist" element={<ProductApprovalList />} />
        <Route path="approval/:_id" element={<ProductApproval />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
