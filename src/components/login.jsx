import PropTypes from "prop-types";
import { useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
 
function Login({loginUser}){
  const username = useRef(null)
  const password = useRef(null)
  const [errors, setErrors] = useState(null)
  const navigate = useNavigate();

  const submitLogin = async (event) => {
    event.preventDefault()  
    // https://worrying-nonnah-niclouiskayencodes-40f94851.koyeb.app/login
    fetch("https://worrying-nonnah-niclouiskayencodes-40f94851.koyeb.app/login", {
      method: "POST",
      redirect: 'follow',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username.current.value,
        password: password.current.value
      }),
      credentials: "include"
  }).then(response=>{
    console.log(response)
      return response.json();
  }).then(response=>{
    console.log(response)
      if (response.errors) {
        console.log(response.errors);
        setErrors(response.errors)
      } else{
        loginUser(response)
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
            <input placeholder="Password" name="password" type="password" ref={password} /></label><br/>
          <button onClick={submitLogin} className="submit">Login</button>
        </form>  
        </>
    )
}

export default Login;

Login.propTypes = {
  loginUser: PropTypes.func,
}