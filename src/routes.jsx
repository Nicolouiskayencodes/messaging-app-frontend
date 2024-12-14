import App from "./App";

const routes = [
  {
    path: "/",
    element: <App />,
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