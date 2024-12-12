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
];

export default routes;