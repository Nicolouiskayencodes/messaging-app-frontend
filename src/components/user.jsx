import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function User({user}) {
  const addFriend = async (id) => {
    fetch(`https://worrying-nonnah-niclouiskayencodes-40f94851.koyeb.app/friend/${id}`, {
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
      <div className="outer-user">
      <div className="inner-user">
      <img className="avatar" src={user.avatar || '/avatar.svg'}/>
      {user.displayName ? (<span className="userbtn">{user.displayName}</span>) : (<span className="userbtn">{user.username}</span>)}
      </div>
      <div className="user-dropdown">
        <div className="user-info">
      <img className="avatar" src={user.avatar || '/avatar.svg'}/>
        <p>{user.username}</p>
        </div>
        <button onClick={()=>addFriend(user.id)} className="user-button">Add Friend</button>
        <button className="user-button"><Link to={`/create/${user.id}`}>Create message</Link></button>
      </div>
      </div>
    </div>
  )
}

export default User;

User.propTypes = {
  user: PropTypes.object
}