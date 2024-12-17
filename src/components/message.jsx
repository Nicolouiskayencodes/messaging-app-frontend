import PropTypes from "prop-types";

function Message({message, user}) {
  return(<>
    {message.authorId === user.id ? (<div className="sent"><img src={message.image}/> <p>{message.content}</p><p>{message.author.displayName || message.author.username}</p><p>{Date(message.createdAt)}</p></div>): (<div className="received"><img src={message.image}/><p>{message.content}</p><p>{message.author.displayName || message.author.username}</p><p>{Date(message.createdA)}</p></div>)}
  </>)
}

export default Message;

Message.propTypes = {
  message: PropTypes.object,
  user: PropTypes.object
}