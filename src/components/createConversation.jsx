import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateConversation({toUser}){
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const [recipients, setRecipients] = useState([])
  console.log(recipients)
  useEffect(()=>{
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
        response.forEach(person => {
          if (person.id === toUser){
            setRecipients([person])
          }
        });
      }
  })
  }, [toUser])
  const addRecipient = (user) => {
    if (!recipients.includes(user)) {
      setRecipients([...recipients, user])
    }
  }
  const removeRecipient = (user) => {
    setRecipients(recipients=> recipients.filter(recipient => recipient.id !== user.id))
  }
  const startConversation = async () => {
    if (recipients.length > 0){
    fetch('http://localhost:3000/conversation', {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userarray: recipients,
      }),
      credentials: "include"
    }
    )
    .then(response => {return response.json()} )
    .then(response=> {
      console.log(response)
      const id = response.id;
      navigate(`/conversation/${id}`)
    })
  }
  }


  return(
    <>
    <h1>Recipients</h1>
    <ul className="recipient-list">
      {recipients && recipients.map(recipient => <p key={recipients.indexOf(recipient)}>{recipient.displayName || recipient.username}<button onClick={()=>removeRecipient(recipient)}>X</button> </p>)}
    </ul>
    <ul className="user-list">
      {users && users.map(user => <p key={user.id}>{user.displayName || user.username}{!recipients.includes(user) && <button onClick={() => addRecipient(user)}>+</button>}</p>)}
    </ul>
    <button onClick={startConversation}>Message</button>
    </>
    
  )
}

export default CreateConversation;

CreateConversation.propTypes = {
  toUser: PropTypes.number
}