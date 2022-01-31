import React,{useState,useEffect}  from 'react';

import { io } from "socket.io-client";

import {useHistory} from "react-router-dom";

const LoggedUser = () => {

  const [notification,setNotification] = useState('');

  const history = useHistory();

   
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("getNotifications", data =>{
      setNotification(data)
    })
    
    },[])

  const Logout =() =>{
    history.push("/")
  } 

  return (
    <div>
      <h1>Hello</h1>
      <h4>All the new messages are shown below:</h4>
      <h5>{notification}</h5>
      <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default LoggedUser
