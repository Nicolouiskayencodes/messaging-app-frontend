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
    fetch('https://worrying-nonnah-niclouiskayencodes-40f94851.koyeb.app/userInfo', {
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
      
      <div className="header">
        <h1>Nico&apos;s Messenger</h1>
          {user && <span>Welcome {user.displayName || user.username}!</span>}
        <div className="navbar">
          <button className="navlink"><Link to='/'>Home</Link></button>
          {!user && <button className="navlink"><Link to="/login">Login</Link></button>}
          {!user && <button className="navlink"><Link to='/register'>Register</Link></button>}
          {user && <button className="navlink"><Link to='/profile'>Profile</Link></button>}
          {user && <Logout userDelete={deleteUser}/>}
        </div>
      </div>
      <div className="flex-body">
      <div className="body-content">
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
      </div>
      </div>
    </>
  )
}

export default App;