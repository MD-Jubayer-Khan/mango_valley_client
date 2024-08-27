import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Auth/Login.jsx';
import SignUp from './components/Auth/SignUp.jsx';
import Profile from './components/profile/Profile.jsx';
import Home from './components/Home/Home.jsx';
import NotFound from './components/shared/NotFound.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import MangoListings from './components/Dashboard/MangoListings.jsx';
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx';
import MangoDetails from './components/Home/MangoDetails.jsx';
import OrderHistory from './components/profile/OrderHistory.jsx';
import ManageOrders from './components/Dashboard/ManageOrders.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/mango/:id',
        loader: ({params})=>  fetch(`${import.meta.env.VITE_baseUrl}/api/marketplaces/mangoes/${params.id}`),
        element: <MangoDetails/>,
      },
      
      {
        path: '/order_history',
        loader: async () => {
          const response = await fetch(`${import.meta.env.VITE_baseUrl}/api/marketplaces/orders/?user_id=${localStorage.getItem('uid')}`,{
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch order');
          }
          return response.json();
        },
        element: <OrderHistory/>,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signUp',
        element: <SignUp />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },

      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: '',
            element: <MangoListings />,
          },
          {
            path: 'listings',
            element: <MangoListings />,
          },
          {
            path:'orders',
            loader: async () => {
              const response = await fetch(`${import.meta.env.VITE_baseUrl}/api/marketplaces/orders/`,{
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${localStorage.getItem("token")}`,
                },
              });
              if (!response.ok) {
                throw new Error('Failed to fetch order');
              }
              return response.json();
            },
            element: <ManageOrders/>
          }
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
