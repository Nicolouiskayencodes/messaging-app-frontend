import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
function Logout({userDelete}) {
  const navigate = useNavigate();
  const logout = async (event) => {
    event.preventDefault()  
    await fetch("https://worrying-nonnah-niclouiskayencodes-40f94851.koyeb.app/logout", {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      credentials: "include"
  }).then(response=>{
      return response.json();
  }).then(response=>{
      if(response.message === 'Logout success') {
        userDelete()
      }
      navigate('/')
  })
  }
  return(
    <button className="navlink" onClick={logout}>Logout</button>
  )
}

Logout.propTypes = {
  userDelete : PropTypes.func
}


export default Logout;