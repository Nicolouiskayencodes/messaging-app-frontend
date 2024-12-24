import PropTypes from "prop-types";
import { useRef } from "react";
import { useState } from "react";

function Message({message, user, reload}) {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false)
  const comment = useRef(null)
  const submitEdit = async () => {
    setLoading(true)
   await fetch(`https://worrying-nonnah-niclouiskayencodes-40f94851.koyeb.app/message/${message.id}`, {
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
    setLoading(false)
    reload()
  }
  const deleteComment = async () => {
    setLoading(true)
    await fetch(`https://worrying-nonnah-niclouiskayencodes-40f94851.koyeb.app/message/${message.id}`, {
      method: "DELETE", 
      credentials: "include",
    }
    )
    .then(response => {return response.json()} )
    .then(response=> { console.log(response)})
    setLoading(false)
    reload()
  }

  return(<>
    {message.authorId === user.id ? (<>
      {(edit) ? (
        <div className="sent"><img src={message.image}/><textarea className="editmessage" defaultValue={message.content} ref={comment} ></textarea> 
        <div className="messageud">
        {!loading && <button onClick={submitEdit}>Edit</button>}
        <button onClick={()=>setEdit(false)}>Cancel</button>
        </div>
      </div>
      ) : (
        <div className="sent"><div className="message-content sent-content"><img src={message.image}/> <p>{message.content}</p></div><div className="sent-info"><div className="sent-user"><img className="avatar" src={message.author.avatar || '/avatar.svg'}/><p>{message.author.displayName || message.author.username}</p></div><div><p className="timestamp">{new Date(message.createdAt).toLocaleString()}</p></div>
      <div className="messageud">{(message.content !== null) && <button onClick={()=> setEdit(true)}>Edit</button>}
        {!loading && <button onClick={deleteComment}>Delete</button>}
        </div>
        </div>
      </div>
      )}
    </>) : (<div className="received"><div className="message-content received-content"><img src={message.image}/><p>{message.content}</p></div><div className="received-info"><div className="received-user"><img className="avatar" src={message.author.avatar || '/avatar.svg'}/><p>{message.author.displayName || message.author.username}</p></div><p className="timestamp">{new Date(message.createdAt).toLocaleString()}</p></div></div>)}
  </>)
}

export default Message;

Message.propTypes = {
  message: PropTypes.object,
  user: PropTypes.object,
  reload: PropTypes.func,
}