import { createHashRouter } from "react-router";
import FrontLayout from "./layout/FrontLayout";
import Home from "./views/front/Home";
import Products from "./views/front/Products";
import ProductDetail from "./views/front/ProductDetail";
import Cart from "./views/front/Cart";
import NotFound from "./views/front/NotFound";
import Login from "./views/front/Login";
import Checkout from "./views/front/Checkout";

export const router = createHashRouter([
  {
    path: "/",
    element: <FrontLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
      {
        path: "cart",
        element: <Cart />,
      },{
        path:"login",
        element:<Login />
      },{
        path:"checkout",
        element:<Checkout />
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);