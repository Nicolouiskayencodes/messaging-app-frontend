import { useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
 
function Login(){
  const username = useRef(null)
  const password = useRef(null)
  const [errors, setErrors] = useState(null)
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
      if (data.errors) {
        console.log(data.errors);
        setErrors(data.errors)
      } else{
        console.log(data);
        navigate('/')
      }
  })
  }

    return(
      <>
      {errors && errors.map(error=><p key={errors.indexOf(error)}>{error.msg}</p>)}
        <form className="login">
          <label>Username <br/>
            <input placeholder="Username" name="username" ref={username} /></label><br/>
          <label>Password<br/>
            <input placeholder="Password" name="password" ref={password} /></label><br/>
          <button onClick={submitLogin}>Login</button>
        </form>  
        </>
    )
}

export default Login;