import { useEffect, useState } from "react";
import User from "./user";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Home({reload}){
  const [conversations, setConversations] = useState(null);
  const [users, setUsers] = useState(null);
  const [friends, setFriends] = useState(null)
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(()=> {
    setLoading(true)
    fetch('https://worrying-nonnah-niclouiskayencodes-40f94851.koyeb.app/userInfo', {
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
        setUser(null)
        setConversations(null)
        setFriends(null)
      } else {
      setUser(response)
      setConversations(response.conversations)
      setFriends(response.friends);
  }})
  fetch('https://worrying-nonnah-niclouiskayencodes-40f94851.koyeb.app/users', {
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
setLoading(false)
  },[reload, loading])
  const now = new Date()
  const timeout = new Date(now.getTime() - (5*60*1000))
  
  return(
    <>
    <h1>Home</h1>
    {loading ? (<p>Loading...</p>):(<>
    { users ? (
      <>
      <div className="see-users">
        {!open && <button onClick={()=>setOpen(true)} className="user-button">See Users </button>}
        {open && <button onClick={()=>setOpen(false)} className="user-button">Close</button>}
        {open && users.map(user => <User key={users.indexOf(user)} user={user} />)}
      </div>
    {friends && <>{friends[0] && <h2>Friends</h2>}</>}
    {friends && friends.map(friend => <div key={friend.id} className="friend">
      <img className="avatar" src={friend.avatar || '/avatar.svg'}/><p>{friend.displayName || friend.username}</p><Link to={`/create/${friend.id}`}>Create new message</Link> {friend.conversations.map(conversation=><div key={conversation.id}>{conversation.Users.length === 2 && <Link to={`/conversation/${conversation.id}`}>Open message</Link>}</div>)}{(new Date(friend.lastActive) > timeout) && <><img src="/online.svg"/><span className="online">online</span></>}</div>)}
      {conversations && <h2>Conversations</h2>}
    {conversations && <div className="conversations"> {conversations.map(conversation => 
      <Link to={`/conversation/${conversation.id}`} key={conversation.id} className={conversation.readBy.some(participant => participant.id === user.id)? ("read") : ("unread")}>{conversation.Users.map(recipient => 
        <span key={recipient.id}>{(user.id !== recipient.id) && <>{recipient.displayName || recipient.username} </>}</span>)}<br/>
      </Link>)}</div>}
    <Link to='/create' className="start-conversation">Start Conversation</Link>
    </>
  ) : (<><p>Please <Link to='/login'>log in</Link> or <Link to='/register'>register</Link>.</p>
    <p>Join a rich community of friendly chatters on a platform that allows you to add friends, hosts group chats, and support picture messages.</p></>
  )}
  </>
  )}
    </>
  
  )
}

export default Home;

Home.propTypes = {
  reload: PropTypes.bool
}