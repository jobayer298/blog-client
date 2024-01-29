import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/home/Home";
import AddBlog from "./pages/addBlog/AddBlog";
import Details from "./pages/details/Details";
import Update from "./pages/update/Update";
import Favorite from "./pages/favorite/Favorite";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "addBlog",
        element: <AddBlog />,
      },
      {
        path: "favorite",
        element: <Favorite />,
      },
      {
        path: "details/:id",
        element: <Details />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/blog/${params.id}`),
      },
      {
        path: "update/:id",
        element: <Update />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/blog/${params.id}`),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
