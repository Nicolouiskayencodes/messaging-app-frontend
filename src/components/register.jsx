import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
 
function Register(){
  const username = useRef(null)
  const password = useRef(null)
  const passwordConfirm = useRef(null)
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const submitLogin = async (event) => {
    event.preventDefault()  
    setLoading(true)
    if (password.current.value === passwordConfirm.current.value && password.current.value && username.current.value){
      await fetch("https://worrying-nonnah-niclouiskayencodes-40f94851.koyeb.app/register", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username.current.value.trim(),
        password: password.current.value
      }),
    }).then(res=>{
      return res.json();
  }).then(data=>{
      console.log(data);
      if (data.message === 'Register success'){
        setLoading(false)
        navigate('/')
      }
  })
    } else  {
      const errorList = []
      if (!username.current.value.trim()){
          errorList.push('Username must not be empty')
        }
      if (!password.current.value){
          errorList.push('Password must not be empty ')
        }  
      if (password.current.value !== passwordConfirm.current.value) {
        errorList.push('Passwords do not match')
      }
      setErrors(errorList)  
      setLoading(false)
    }
    
  
  }

    return(
      <>
      {errors && errors.map(error => <p key={errors.indexOf(error)} className="errors">{error}</p>)}
        <form className="register">
            <label>Username<br></br>
            <input placeholder="Username" name="username" ref={username} required/></label><br/>
            <label>Password<br/>
            <input placeholder="Password" name="password" ref={password} type="password" required/></label><br/>
            <label>Confirm Password<br/>
            <input placeholder="Confirm Password" name="password-confirm" ref={passwordConfirm} type="password"></input></label><br/>

            {!loading && <button onClick={submitLogin} className="submit">Register</button>}
        </form>  
      </>
    )
}

export default Register;