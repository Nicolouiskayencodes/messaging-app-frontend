import { Link} from "react-router-dom";

function App(){

    const logout = () => {
      fetch("http://localhost:3000/logout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include'
    }).then(res=>{
        return res.json();
    }).then(data=>{
        console.log(data);
    })
    }

    return(
      <>
          <p>Hello world</p>
            <div className="header">
                <div className="navbar">
                    <Link to="/login">Login</Link>
                    <button onClick={logout}>Logout</button>
                    <Link to='/protected'>Protected</Link>
                </div>
            </div>
      </>
    )
}

export default App;