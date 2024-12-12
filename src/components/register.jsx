import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
 
function Register(){
  const username = useRef(null)
  const password = useRef(null)
  const passwordConfirm = useRef(null)
  const [errors, setErrors] = useState([])
  const navigate = useNavigate();

  const submitLogin = async (event) => {
    event.preventDefault()  
    if (password.current.value === passwordConfirm.current.value){
      await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username.current.value,
        password: password.current.value
      }),
    }).then(res=>{
      return res.json();
  }).then(data=>{
      console.log(data);
      navigate('/')
  })
    } else {
      if (!errors.includes('Passwords do not match')) {
        setErrors([...errors, 'Passwords do not match'])
      }
    }
    
  
  }

    return(
      <>
      {errors && errors.map(error => <p key={errors.indexOf(error)}>{error}</p>)}
        <form className="register">
            <label>Username<br></br>
            <input placeholder="Username" name="username" ref={username} /></label><br/>
            <label>Password<br/>
            <input placeholder="Password" name="password" ref={password} type="password"/></label><br/>
            <label>Confirm Password<br/>
            <input placeholder="Confirm Password" name="password-confirm" ref={passwordConfirm} type="password"></input></label><br/>

            <button onClick={submitLogin}>Register</button>
        </form>  
      </>
    )
}

export default Register;