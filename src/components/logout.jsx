import { useNavigate } from "react-router-dom";
function Logout() {
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
      navigate('/')
  })
  }
  return(
    <button onClick={logout}>Logout</button>
  )
}
export default Logout;