import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateConversation({toUser}){
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const [recipients, setRecipients] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    setLoading(true)
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
        response.forEach(person => {
          if (person.id === toUser){
            setRecipients([person])
          }
        });
      }
      setLoading(false)
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
    setLoading(true)
    if (recipients.length > 0){
    fetch('https://worrying-nonnah-niclouiskayencodes-40f94851.koyeb.app/conversation', {
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
      const id = response.id;
      setLoading(false)
      navigate(`/conversation/${id}`)
    })
  }
  }


  return(
    <>
    <h1>Recipients</h1>
    <ul className="recipient-list">
      {recipients && recipients.map(recipient => <p key={recipients.indexOf(recipient)}>{recipient.displayName || recipient.username} <button onClick={()=>removeRecipient(recipient)}>X</button> </p>)}
    </ul>
    <h1>Add</h1>
    <ul className="user-list">
      {users && users.map(user => <p key={user.id}>{!recipients.includes(user) && <button onClick={() => addRecipient(user)} className="add-recipient"><img src={user.avatar || '/avatar.svg'} className="avatar"/> {user.displayName || user.username} +</button>}</p>)}
    </ul>
    {!loading && <button onClick={startConversation} className="new-conversation">Message</button>}
    </>
    
  )
}

export default CreateConversation;

CreateConversation.propTypes = {
  toUser: PropTypes.number
}