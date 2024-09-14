    import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
    import { Link, useNavigate } from "react-router-dom"; // You need React Router for this
import swal from "sweetalert";
import { loginUser, resetLoginState } from "../redux/userslice";

    const LoginForm = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      const [isLoggingIn, setIsLoggingIn] = useState(false);

       const dispatch = useDispatch();
       const navigate = useNavigate();

       const loginHandler = () => {
         const credentials = { email, password };
         setIsLoggingIn(true)
         dispatch(loginUser(credentials));
       };
      
      const { loggedIn, user, error } = useSelector((state) => state.user);
      
      console.log(user)
      
       useEffect(() => {
         if (loggedIn && isLoggingIn) {
           swal({
             title: "Success",
             text: "Login Successful",
             icon: "success",
             timer: 2000,
             buttons: false,
           }).then(() => {
             navigate("/");
             setIsLoggingIn(false);
           });
         } else if (error) {
           swal({
             title: "Error",
             text: error,
             icon: "error",
           });
           setIsLoggingIn(false);
         }
       }, [loggedIn, error, navigate, isLoggingIn]);



      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
          <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-white text-center">
              Login
            </h1>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={loginHandler}
                  className="w-full py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                >
                  Login
                </button>
              </div>

              <div className="text-sm text-gray-400 text-center">
                New user?{" "}
                <Link
                  to="/signup"
                  className="text-blue-400 hover:text-blue-500 underline"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      );
    };

    export default LoginForm;
