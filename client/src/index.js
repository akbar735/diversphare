import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Seller from "./components/seller/Seller";
import SellerRegister from "./components/seller_register/SellerRegister";
import ForgotPassword from "./components/forgot_password/ForgotPassword";
import OtpVarification from "./components/forgot_password/OtpVarification";
import AddProduct from "./components/add_product/AddProduct";
import { allPages } from "./constants/pages";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: allPages.HOME, element: <Home /> },
      { path: allPages.LOGIN, element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/seller", element: <Seller /> },
      { path: "/seller/addproduct", element: <AddProduct /> },
      { path: "/sellerregister", element: <SellerRegister /> },
      { path: "/forgotpassword", element: <ForgotPassword /> },
      { path: "/otpvarification", element: <OtpVarification /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
