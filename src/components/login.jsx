import { useRef} from "react";
import { useNavigate } from "react-router-dom";
 
function Login(){
  const username = useRef(null)
  const password = useRef(null)
  const navigate = useNavigate();

  const submitLogin = async (event) => {
    event.preventDefault()  
    await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username.current.value,
        password: password.current.value
      }),
      credentials: "include"
  }).then(res=>{
      return res.json();
  }).then(data=>{
      console.log(data);
      navigate('/')
  })
  }

    return(
        <form className="login">
            <h1>Username</h1>
            <input placeholder="Username" name="username" ref={username} />
            <h1>Password</h1>
            <input placeholder="Password" name="password" ref={password} />

            <button onClick={submitLogin}>Login</button>
        </form>  
    )
}

export default Login;