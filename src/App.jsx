import { Link, useParams} from "react-router-dom";
import Logout from "./components/logout";
import Protected from "./components/protected";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import { useState, useEffect } from "react";
import './App.css'

function App(){
  const {page} = useParams();
  const [user, setUser] = useState(null)

  const deleteUser = ()=> setUser(null)
  const loginUser = (userdata) => setUser(userdata);

  useEffect(()=>{
    fetch('http://localhost:3000/protected', {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      credentials: "include"
    }
    )
    .then(response => {return response.json()} )
    .then(response=> {
  setUser(response);})
  },[])

    console.log(user)

  return(
    <>
      <p>Hello world</p>
        <div className="header">
          <div className="navbar">
            <button className="navlink"><Link to='/'>Home</Link></button>
            <button className="navlink"><Link to="/login">Login</Link></button>
            <button className="navlink"><Link to='/protected'>Protected</Link></button>
            <button className="navlink"><Link to='/register'>Register</Link></button>
            <Logout userDelete={deleteUser}/>
          </div>
        </div>
        {page === 'login' ? (
          <Login loginUser={loginUser}/>
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