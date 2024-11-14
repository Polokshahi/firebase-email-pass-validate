import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  Router,
  RouterProvider,
} from "react-router-dom";
import Mains from './Layout/Mains.jsx';
import Home from './Components/Home/Home.jsx';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import Header from './Components/Header/Header.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mains></Mains>,
    children: [
    
      {
        path:  '/home',
        element: <Home></Home>
      },

      {
        path: '/login',
        element: <Login></Login>,
      },

      {
        path: '/register', 
        element: <Register></Register>,
      },

      {
        path: '/signup',
        element: <SignUp></SignUp>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
