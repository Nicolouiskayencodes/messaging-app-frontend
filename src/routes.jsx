import { Navigate } from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/errorpage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:page",
    element: <App />,
  }, 
  {
    path:"/:page/:elementid",
    element: <App />
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
      },
];

export default routes;