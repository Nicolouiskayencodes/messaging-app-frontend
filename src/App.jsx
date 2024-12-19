import { Link, useParams} from "react-router-dom";
import Logout from "./components/logout";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Conversation from "./components/conversation"
import { useState, useEffect } from "react";
import './App.css'
import CreateConversation from "./components/createConversation";
import Profile from "./components/profile";

function App(){
  const {page, elementid} = useParams();
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);
  const deleteUser = ()=> {
    setUser(null);
    setReload(true)
  }
  const loginUser = (userdata) => {
    setUser(userdata);
    setReload(true)
  }

  useEffect(()=>{
    setReload(false)
    fetch('http://localhost:3000/userInfo', {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      credentials: "include"
    }
    )
    .then(response => {return response.json()} )
    .then(response=> {if (response.message === 'Not authenticated') {
      setUser(null)
    } else {
  setUser(response);
  }})
  },[reload])


  return(
    <>
      {user && <p>Welcome {user.username}</p>}
        <div className="header">
          <div className="navbar">
            <button className="navlink"><Link to='/'>Home</Link></button>
            {!user && <button className="navlink"><Link to="/login">Login</Link></button>}
            {!user && <button className="navlink"><Link to='/register'>Register</Link></button>}
            {user && <button className="navlink"><Link to='/profile'>Profile</Link></button>}
            {user && <Logout userDelete={deleteUser}/>}
          </div>
        </div>
        {page === 'login' ? (
          <Login loginUser={loginUser}/>
        ): page === 'register' ? (
          <Register />
        ): page === 'create'  ? (
          <CreateConversation toUser={parseInt(elementid)}/>
        ) : page === 'conversation' ? (
          <Conversation conversationId={parseInt(elementid)}/>
        ) : page === 'profile' ? (
          <Profile/>
        ) : (
          <Home reload={reload}/>
        )}
    </>
  )
}

export default App;