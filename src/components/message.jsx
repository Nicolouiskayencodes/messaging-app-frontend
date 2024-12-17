import PropTypes from "prop-types";
import { useRef } from "react";
import { useState } from "react";

function Message({message, user, reload}) {
  const [edit, setEdit] = useState(false);
  const comment = useRef(null)
  const submitEdit = () => {
    fetch(`http://localhost:3000/message/${message.id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json"
    },
      body: JSON.stringify({
        content: comment.current.value,
      }), 
      credentials: "include",
    }
    )
    .then(response => {return response.json()} )
    .then(response=> { console.log(response)})
    setEdit(false)
    reload()
  }
  const deleteComment = () => {
    fetch(`http://localhost:3000/message/${message.id}`, {
      method: "DELETE", 
      credentials: "include",
    }
    )
    .then(response => {return response.json()} )
    .then(response=> { console.log(response)})
    reload()
  }

  return(<>
    {message.authorId === user.id ? (<>
      {(edit) ? (
        <div className="sent"><input defaultValue={message.content} ref={comment}></input> 
      <button onClick={submitEdit}>Edit</button>
        <button onClick={()=>setEdit(false)}>Cancel</button>
      </div>
      ) : (
        <div className="sent"><img src={message.image}/> <p>{message.content}</p><img className="avatar" src={message.author.avatar}/><p>{message.author.displayName || message.author.username}</p><p>{Date(message.createdAt)}</p> 
      {(message.content !== null) && <button onClick={()=> setEdit(true)}>Edit</button>}
        <button onClick={deleteComment}>Delete</button>
      </div>
      )}
    </>) : (<div className="received"><img src={message.image}/><p>{message.content}</p><p>{message.author.displayName || message.author.username}</p><p>{Date(message.createdA)}</p></div>)}
  </>)
}

export default Message;

Message.propTypes = {
  message: PropTypes.object,
  user: PropTypes.object,
  reload: PropTypes.func,
}