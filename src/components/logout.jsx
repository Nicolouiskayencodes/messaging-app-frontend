import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
function Logout({userDelete}) {
  const navigate = useNavigate();
  const logout = async (event) => {
    event.preventDefault()  
    await fetch("http://localhost:3000/logout", {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      credentials: "include"
  }).then(res=>{
      return res.json();
  }).then(data=>{
      console.log(data);
      if(data.message === 'Logout success') {
        userDelete()
      }
      navigate('/')
  })
  }
  return(
    <button onClick={logout}>Logout</button>
  )
}

Logout.propTypes = {
  userDelete : PropTypes.func
}


export default Logout;