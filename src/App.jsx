import { Link, useParams} from "react-router-dom";
import Logout from "./components/logout";
import Protected from "./components/protected";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";

function App(){
  const {page} = useParams();

    const logout = () => {
      fetch("http://localhost:3000/logout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include'
    }).then(res=>{
        return res.json();
    }).then(data=>{
        console.log(data);
    })
    }

    return(
      <>
          <p>Hello world</p>
            <div className="header">
                <div className="navbar">
                    <Link to="/login">Login</Link>
                    <button onClick={logout}>Logout</button>
                    <Link to='/protected'>Protected</Link>
                    <Link to='/register'>Register</Link>
                    <Logout />
                </div>
            </div>
            {page === 'login' ? (
              <Login />
            ): page === 'register' ? (
              <Register />
            ): page === 'protected' ? (
              <Protected />
            ) : (
              <Home />
            )}
      </>
    )
}

export default App;