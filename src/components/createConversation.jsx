import { useEffect, useState } from "react";

function CreateConversation(){
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
      }
  })
  }, [])
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
    })
  }
  }


  return(
    <>
    <h1>Recipients</h1>
    <ul>
      {recipients && recipients.map(recipient => <p key={recipients.indexOf(recipient)}>{recipient.displayName || recipient.username}<button onClick={()=>removeRecipient(recipient)}>X</button> </p>)}
    </ul>
    <ul>
      {users && users.map(user => <p key={user.id}>{user.displayName || user.username}<button onClick={() => addRecipient(user)}>+</button></p>)}
    </ul>
    <button onClick={startConversation}>Message</button>
    </>
    
  )
}

export default CreateConversation;