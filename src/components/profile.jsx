import { useEffect, useState, useRef } from "react"

function Profile() {
  const [user, setUser] = useState(null)
  const [edit, setEdit] = useState(false)
  const [reload, setReload] = useState(false)
  const photo = useRef(null)
  const nickname = useRef(null)
  console.log(edit)
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
  }, [reload])
  const submitProfile = (event) => {
    event.preventDefault();
    console.log(photo.current.files)
    if (photo.current.files[0]){ 
      const formData = new FormData()
      formData.append('file', photo.current.files[0])
      fetch(`http://localhost:3000/updateavatar`, {
        method: "PUT", 
        body: formData, 
        credentials: "include",
      }
      )
      .then(response => {return response.json()} )
      .then(response=> { console.log(response)})
    }
    if (nickname.current.value) {
      fetch(`http://localhost:3000/updatename`, {
        method: "PUT", body: JSON.stringify({
          name: nickname.current.value,
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
    nickname.current.value = null
    photo.current.value = null
    setEdit(false)
    setReload(true)
  }

  return(<>
  {user && 
  <>{edit ? (<>
    <label>Avatar: <input type="file" ref={photo} name="avatar"></input></label>
    <label>Nickname: <input type="text" ref={nickname}></input></label>
    <button onClick={submitProfile} >Submit</button>
  </>) : (<>
    {user.avatar ? (<img src={user.avatar} alt="Your avatar" />) : (<img />)}
  <p>Nickname: {user.displayName || user.username}</p>
  <p>Username: {user.username}</p> 
  <button onClick={()=>setEdit(true)} >Edit</button>
  </>
  )}
  </>}
  </>)
}

export default Profile