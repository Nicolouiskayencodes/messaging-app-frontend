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
  }
];

export default routes;