import App from "./App";
import Login from "./components/login";
import Protected from "./components/protected";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  }, 
  {
    path: "/protected",
    element: <Protected />
  },
];

export default routes;