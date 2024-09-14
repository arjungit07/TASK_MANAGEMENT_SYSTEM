import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, resetRegisterSucess } from "../redux/userslice";
import swal from "sweetalert";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registerSuccess, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (registerSuccess) {
      swal("Success", "User Registered Successfully", "success").then(() => {
        // Reset the register success state
        dispatch(resetRegisterSucess());
        // Navigate to login page
        navigate("/login");
      });
    }
  }, [registerSuccess, navigate]);


   const registerHandler = () => {
     // Regular expression to validate email format
     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

     if (!email.match(emailPattern)) {
       alert("Please enter a valid email address");
       return;
     }

     if (password !== confirmPass) {
       alert("Passwords do not match");
       return;
     }

     const user = { name, password, email, confirmPass };
     dispatch(registerUser(user));
   };
    

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-white text-center">
          Sign Up
        </h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              required
              className="mt-1 block w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="mt-1 block w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="button"
              onClick={registerHandler}
              className="w-full py-3 my-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
              Sign Up
            </button>
                  </div>

          <div className="text-sm text-gray-400 text-center">
                Already a user?r?{" "}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-500 underline"
                >
                  Login
                      </Link>
                </div>      
                  
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
