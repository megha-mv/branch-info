import React,{useState,useEffect} from 'react';

import {io} from 'socket.io-client'

const NewCust = () => {

  const initial = {
    contact:"",
    pincode:'',
  }

  const [userContact,setUserContact] = useState(initial)
  const [users, setUsers] = useState([])
  const [socket, setSocket] = useState(null);

  
  useEffect(() => {
    setSocket(io("http://localhost:5000"));    
  }, []);

  useEffect(() => {
    socket?.emit("newBranch", userContact.pincode );
  }, [socket, userContact.pincode]);

  let name, value;

  const handleInputs = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUserContact({ ...userContact, [name]: value });
  };

  const fetchData = async () =>{

    // e.preventDefault();
    fetch("/branches")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
  }

  useEffect(() => {
    fetchData()
  },[])


  const tableRows = users.map((info,i) => {
    return (
      <tr key={i}>
        <td>{info.branchName}</td>
        <td>{info.pincode}</td>
        <td>{info.place}</td>
        <td>{info.userName}</td>
      </tr>
    );
  });

  const handleNotification = () =>{
    socket.emit("sendNotification",{      
      senderName : userContact.contact,
      receiverName:userContact.pincode,
      msg : "Hello",
    })
    alert("Notification sent!! to the branch ")
  }


  return (
    <div>
      <h1>New Customer Contact Form</h1>
      <div>
          <form method='GET'>
              <label>Contact number:</label>
              <input
              type="number"
              name="contact"
              id="contact"
              value={userContact.contact}
              placeholder="Enter your contact number"
              onChange={handleInputs}
              ></input>
              <br/>
              <label>Pincode:</label>
              <input
              type="array"
              name="pincode"
              id="pincode"
              value={userContact.pincode}
              placeholder="Enter pincode of the area"
              onChange={handleInputs}></input>
              <button onClick={handleNotification}>Contact Us</button>
          </form>
      </div>
      <div>
        <div>
        <table>
        <thead>
          <tr>
            <th>BranchName</th>
            <th>Pincode</th>
            <th>Place</th>
            <th>Branch Manager</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
        </div>
      </div>
    </div>
  )
}

export default NewCust
