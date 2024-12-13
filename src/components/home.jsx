import { useEffect, useState } from "react";
import User from "./user";

function Home(){
  const [messages, setMessages] = useState(null);
  const [users, setUsers] = useState(null);
  const [friends, setFriends] = useState(null)
  useEffect(()=> {
    fetch('http://localhost:3000/userInfo', {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      credentials: "include"
    }
    )
    .then(response => {return response.json()} )
    .then(response=> {
      console.log(response)
  setMessages(response.conversations)
  setFriends(response.friends);})
  fetch('http://localhost:3000/users', {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
    credentials: "include"
  }
  )
  .then(response => {return response.json()} )
  .then(response=> {
setUsers(response);})
  },[])
  console.log(messages)
  console.log(users)
  console.log(friends)
  return(
    <>
    <h1>Home</h1>
    {users && users.map(user => <User key={users.indexOf(user)} user={user} />)}
    <h2>Friends</h2>
    {friends && friends.map(friend => <div key={friends.indexOf(friend)}><p>{friend.displayName || friend.username}</p><p>{friend.lastActive}</p></div>)}
    {messages && messages.map(message => <p key={messages.indexOf(message)}>{message}</p>)}
    </>
  )
}

export default Home;