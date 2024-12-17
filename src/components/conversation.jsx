import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import Message from "./message";

function Conversation({conversationId}) {
  const [messages, setMessages] = useState(null)
  const [user, setUser] = useState(null)
  const [recipients, setRecipients]= useState(null)
  const [reload, setReload] = useState(false)
  const newMessage = useRef(null);
  const photo = useRef(null);
  useEffect(()=>{
    setReload(false)
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
    })
    fetch(`http://localhost:3000/conversation/${conversationId}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
      credentials: "include"
    }
    )
    .then(response => {return response.json()} )
    .then(response=> {
      console.log(response);
      setMessages(response.Messages)
      setRecipients(response.Users)
    })
  }, [conversationId, reload])
  const addPhoto = () => {

  }
  const submitMessage = (event) => {
    event.preventDefault();
    console.log(photo.current.files)
    if (photo.current.files[0]){ 
      const formData = new FormData()
      formData.append('file', photo.current.files[0])
      fetch(`http://localhost:3000/message/${conversationId}`, {
        method: "POST", 
        body: formData, 
        credentials: "include",
      }
      )
      .then(response => {return response.json()} )
      .then(response=> { console.log(response)})
    }
    if (newMessage.current.value) {
      fetch(`http://localhost:3000/message/${conversationId}`, {
        method: "POST", body: JSON.stringify({
          content: newMessage.current.value,
        }),
        headers: {
            "Content-Type": "application/json"
        },
        
        credentials: "include",
      }
      )
      .then(response => {return response.json()} )
      .then(response=> { console.log(response)})
    }
    newMessage.current.value = null
    photo.current.value = null
    setReload(true)
  }
  console.log(messages)
  console.log(recipients)
  return(<>
    <div>{(recipients && user) && recipients.map(recipient => <span key={recipient.id}>{recipient.id !== user.id && <>{recipient.displayName || recipient.username}</>}</span>)}</div>
    {(messages && user)  && messages.map(message => <Message key={messages.indexOf(message)} message={message} user={user} />)}
    <form onSubmit={submitMessage}><input type="file" onClick={addPhoto} ref={photo} name="picture"></input><input type="text" ref={newMessage} name="content"></input><button type="submit">Send</button></form>
  </>)
}

export default Conversation;

Conversation.propTypes = {
  conversationId: PropTypes.number,
}