import { useEffect, useState } from "react";
import User from "./user";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Home({reload}){
  const [conversations, setConversations] = useState(null);
  const [users, setUsers] = useState(null);
  const [friends, setFriends] = useState(null)
  const [user, setUser] = useState(null)
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
      setUser(response)
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
  },[reload])
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
    {friends && friends.map(friend => <div key={friends.indexOf(friend)}><img className="avatar" src={friend.avatar}/><p>{friend.displayName || friend.username}</p><p>{friend.lastActive}</p><Link to={`/create/${friend.id}`}>Create new message</Link> {friend.conversations.map(conversation=><>{conversation.Users.length === 2 && <Link to={`/conversation/${conversation.id}`}>Open message</Link>}</>)}</div>)}
    {conversations && conversations.map(conversation => 
      <Link to={`/conversation/${conversation.id}`} key={conversation.id} className={conversation.readBy.some(participant => participant.id === user.id)? ("read") : ("unread")}>{conversation.Users.map(recipient => 
        <span key={recipient.id}>{(user.id !== recipient.id) && <>{recipient.displayName || recipient.username} </>}</span>)}<br/>
      </Link>)}
    <Link to='/create'>Start Conversation</Link>
    </>
  ) : (<p>Please <Link to='/login'>log in</Link> or <Link to='/register'>register</Link>.</p>)}
    </>
  )
}

export default Home;

Home.propTypes = {
  reload: PropTypes.bool
}