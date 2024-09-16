import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"




const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    user: null,
    error: null,
    registerSuccess: false,
    token: null, // Add token to store
  },
  reducers: {
    loginUserRequest(state) {
      state.error = null; // Reset error on new login attempt
    },
    loginUserSuccess(state, action) {
      state.loggedIn = true;
      state.user = action.payload.user;
      state.error = null;
      state.token = action.payload.token;
    },
    loginUserFailure(state, action) {
      state.loggedIn = false;
      state.error = action.payload;
    },
    resetLoginState(state, action) {
       state.loggedIn = false;
    },
   logout(state) {
      state.loggedIn = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
     localStorage.removeItem("user");
    },
    loadUserFromLocalStorage(state) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      
      if (token && user) {
        state.loggedIn = true;
        state.token = token;
        state.user = user;
        state.error = null;
      }
     
    }, 
    registerUsersRequest(state) {
      state.registerSuccess = false;
    },
    registerUserSuccess(state, action) {
      state.user = action.payload;
      state.registerSuccess = true;
    },
    registerUserFailure(state, action) {
      state.error = action.payload;
      state.registerSuccess = false;
    },
    resetRegisterSucess(state, action) {
      state.loggedIn = false
    }
  },
});

export const {
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  registerUsersRequest,
  registerUserSuccess,
  registerUserFailure,
  logout,
  resetLoginState,
  resetRegisterSucess,
  loadUserFromLocalStorage,
} = userSlice.actions;


const backend_url = process.env.BACKEND_URL;

console.log("Backend URL:", backend_url); // This should print the correct UR

export const registerUser = (user) => async (dispatch) => {
  dispatch(registerUsersRequest());
  try {
    const response = await axios.post(`${backend_url}/api/users/signup`, user);
    dispatch(registerUserSuccess(response.data));
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};
  

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginUserRequest());
  try {
    console.log("Backend URL:", backend_url); // This should print the correct UR

    const response = await axios.post(
      `${backend_url}/api/users/login`,
      credentials
    );
    const { token, user } = response.data;
    dispatch(loginUserSuccess({ token, user }));

    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
  } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.error
          : error.message;
    dispatch(loginUserFailure(errorMessage));
  }
};

export default userSlice.reducer;
