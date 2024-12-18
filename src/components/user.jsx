import PropTypes from "prop-types";

function User({user}) {
  const addFriend = async (id) => {
    fetch(`http://localhost:3000/friend/${id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      credentials: "include"
    }
    )
    .then(response => {return response.json()} )
    .then(response=> {
  console.log(response)})
  }

  return(
    <div className="user">
      <img className="avatar" src={user.avatar}/>
      {user.displayName ? (<button className="userbtn">{user.displayName}</button>) : (<button className="userbtn">{user.username}</button>)}
      <div className="user-dropdown">
        {user.avatar && <img src={user.avatar}/>}
        <p>{user.username}</p>
        <button onClick={()=>addFriend(user.id)}>Add Friend</button>
      </div>
    </div>
  )
}

export default User;

User.propTypes = {
  user: PropTypes.object
}