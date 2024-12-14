import { useEffect, useState } from "react";
import User from "./user";
import { Link } from "react-router-dom";

function Home(){
  const [conversations, setConversations] = useState(null);
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
  setConversations(response.conversations)
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
    if (response.message === 'Not authenticated') {
      setUsers(null)
    } else {
      setUsers(response)
    }
})
  },[])
  console.log(conversations)
  console.log(users)
  console.log(friends)
  return(
    <>
    <h1>Home</h1>
    { users ? (
      <>
    {users.map(user => <User key={users.indexOf(user)} user={user} />)}
    <h2>Friends</h2>
    {friends && friends.map(friend => <div key={friends.indexOf(friend)}><p>{friend.displayName || friend.username}</p><p>{friend.lastActive}</p></div>)}
    {conversations && conversations.map(conversation => <p key={conversations.indexOf(conversation)}>{conversation.id}</p>)}
    <Link to='/create'>Start Conversation</Link>
    </>
  ) : (<p>Please <Link to='/login'>log in</Link> or <Link to='/register'>register</Link>.</p>)}
    </>
  )
}

export default Home;