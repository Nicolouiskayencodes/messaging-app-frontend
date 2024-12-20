import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return(
    <div>
      <h1>Oh no, something went wrong!</h1>
      <Link to="/">
        You can go back to the home page by clicking here!
      </Link>
      <hr></hr>
      <p><i>{error.statusText || error.message}</i></p>
    </div>
  )
}