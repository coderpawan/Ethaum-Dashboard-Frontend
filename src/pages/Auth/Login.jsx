import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Logo from "../../images/ethaum.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      // Store token in localStorage
      localStorage.setItem("jwt", res.token);
      navigate(redirect);
      toast.success("User successfully logged in");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-gray-200 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-gray-800 shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <a href="/">
              <img src={Logo} className="w-32 mx-auto" alt="Logo" />
            </a>
          </div>
          <div className="mt-6 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold text-gray-100">
              Sign In
            </h1>
            <div className="w-full flex-1 mt-6">
              <form onSubmit={submitHandler} className="mx-auto max-w-xs">
                <div className="my-5">
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg text-white font-medium bg-gray-700 border border-gray-600 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-gray-600"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="my-5">
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-3 rounded-lg text-white font-medium bg-gray-700 border border-gray-600 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-gray-600"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button className="mt-5 tracking-wide font-semibold bg-blue-gradient text-slate-800 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  {isLoading ? (
                    <span className="ml-3">Signing In</span>
                  ) : (
                    <span className="ml-3">Sign In</span>
                  )}
                </button>

                {isLoading && <Loader />}
              </form>

              <div className="mt-4 text-center">
                <p className="text-gray-500">
                  New Customer?{" "}
                  <Link
                    to={
                      redirect ? `/register?redirect=${redirect}` : "/register"
                    }
                    className="text-gradient hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-gray-900 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg)`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
