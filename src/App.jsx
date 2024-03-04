import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Order, { loader as orderLoader } from "./features/oreder/Order";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/oreder/CreateOrder";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import { action as createOrder } from "./features/oreder/CreateOrder";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        
        path: "",
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
        errorElement: <Error />,
        loader: menuLoader,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "order/new",
        element: <CreateOrder />,
        errorElement: <Error />,
        action: createOrder,
      },
      {
        path: "order/:id",
        loader: orderLoader,
        errorElement: <Error />,
        element: <Order />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
