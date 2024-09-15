  import HomePage from './Pages/HomePage';
  import { BrowserRouter, Routes, Route , Navigate, useNavigate } from "react-router-dom";
  import SignUpForm from './Pages/Signup';
  import LoginForm from './Pages/Login';
  import {  useDispatch, useSelector } from 'react-redux';
  import { loadUserFromLocalStorage, } from './redux/userslice';
  import { useEffect } from 'react';
  import Loader from './Pages/Loader';
  import { fetchTasks} from './redux/tasksSlice';

  

function App() {
    

  const navigate = useNavigate()

    const { tasks, loading,  error } = useSelector(state => state.tasks)
     const { loggedIn } = useSelector(state => state.user)
    
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
      if (loggedIn) {
        navigate("/"); 
      }
    }, [loggedIn, navigate]);
    
  
      useEffect(() => {
        dispatch(loadUserFromLocalStorage());
      }, [dispatch]);
  
    
      if (loading) {
        return <Loader />; //
      }

    return (
        <div className="bg-gray-800 text-white p-1 h-screen">
          <Routes>
            <Route
              path="/"
              element={
                // localStorage.getItem("token") && localStorage.getItem("user") ? ( 
                loggedIn ? (
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
    );
  }

  export default App;
