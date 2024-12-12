import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Protected() {
  useEffect(()=>{
    fetch('http://localhost:3000/userinfo', {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      credentials: "include"
    }
    )
    .then(response => {return response.json()} )
    .then(response=> console.log(response))
  },[])
  return(
    <>
    <p>Protected</p>
    <Link to={'/'}></Link>
    </>
  )
  
}