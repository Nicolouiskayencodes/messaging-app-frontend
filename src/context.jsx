import {createContext} from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export function UserContextProvider({children}){

    function register(username, password){
        fetch("http://localhost:3000/register", {
            method: "POST",
            data: {
                username: username,
                password: password
            }
        }).then(res=>{
            return res.json();
        }).then(data=>{
            console.log(data)
        })
    }

    function login(username, password){
        const data = fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        }).then(res=>{
            return res.json();
        }).then(data=>{
            console.log(data);
            return data;
        })

        return data;
    }

    return(
        <UserContext.Provider value={{register, login}}>{children}</UserContext.Provider>
    )
}

UserContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ])
}


export default UserContext;