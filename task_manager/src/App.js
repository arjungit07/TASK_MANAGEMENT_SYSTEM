  import HomePage from './Pages/HomePage';
  import { BrowserRouter, Routes, Route , Navigate } from "react-router-dom";
  import SignUpForm from './Pages/Signup';
  import LoginForm from './Pages/Login';
  import {  useDispatch, useSelector } from 'react-redux';
  import { loadUserFromLocalStorage, } from './redux/userslice';
  import { useEffect } from 'react';
  import Loader from './Pages/Loader';
  import { fetchTasks} from './redux/tasksSlice';

  

  function App() {

    const { tasks, loading, loggedIn , error } = useSelector(state => state.tasks)
    console.log(tasks)

    const dispatch = useDispatch();


    const token = localStorage.getItem("token")
    console.log(token)
    
    useEffect(() => {

      if (token && tasks.length  < 1) {
        dispatch(fetchTasks(token));
      }
      console.log("done")

    }, [tasks, token, dispatch])
    
    useEffect(() => {
      if (loggedIn && !error) {
        Navigate("/"); 
      }
    }, [loggedIn, error, Navigate]);

    
  
      useEffect(() => {
        dispatch(loadUserFromLocalStorage());
      }, [dispatch]);
  
    
      if (loading) {
        return <Loader />; //
      }

    return (
    
      <BrowserRouter>
        <div className="bg-gray-800 text-white p-1 h-screen">
          <Routes>
            <Route
              path="/"
              element={
                localStorage.getItem("token") && localStorage.getItem("user") ? (
                  <HomePage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/loader" element={<Loader />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }

  export default App;
