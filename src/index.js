// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

import React from "react";
import ReactDOM from "react-dom/client";
import ErrorPage from "./components/Admin/ErrorPage";
import App from './App'
import MainLayout from './layout/admin/MasterLayout';
import Dashboard from "./components/Admin/Dashboard";
import Profile from "./components/Admin/Profile";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import BigSpinner from "./components/BigSpinner";


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (!localStorage.getItem('auth_token') ? <Login /> : <App />),
  },
  {
    path: "/register",
    element: (!localStorage.getItem('auth_token') ? <Register /> : <App />),
  },

  {
    path: "/admin/",
    element: <MainLayout />,

    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/profile",
        element: <Profile />,
      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}
      fallbackElement={<BigSpinner />}
    />
  </React.StrictMode>
);