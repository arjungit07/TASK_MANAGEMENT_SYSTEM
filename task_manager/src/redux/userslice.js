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

export const registerUser = (user) => async (dispatch) => {
  dispatch(registerUsersRequest());
  try {
    const response = await axios.post("/api/users/signup", user);
    dispatch(registerUserSuccess(response.data));
  } catch (error) {
    dispatch(registerUserFailure(error.message));
  }
};
  

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginUserRequest());
  try {
    const response = await axios.post("/api/users/login", credentials);
     const { token, user } = response.data; 
    dispatch(loginUserSuccess({token , user}));

    localStorage.setItem("token", token); 
    localStorage.setItem("user",user);
  } catch (error) {
    dispatch(loginUserFailure(error.message));
  }
};

export default userSlice.reducer;
