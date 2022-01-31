import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import '../App.css'



const Login = () => {

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const loginUser= async (e)=>{
    e.preventDefault();

    const res = await fetch("/login",{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        email,password
      })
  });

  const data = res.json();

  if(res.status === 400 || !data){
    window.alert("Invalid credentials");
  }
  else{
    alert(`Logged In To Branch : ${password}`)
    history.push("/LoggedUser");
  }

}
  return (
    <>
    <h1>Login</h1>
    <div className="container">      
      <div className="login">
        <form method="POST">
          <label>Email :</label>
          <input
            type="email"
            placeholder="Email Required"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <br/>
          <label>Password :</label>
          <input
            type="password"
            placeholder="Password Required"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br />
          <button type="submit" onClick={loginUser}>Login</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
