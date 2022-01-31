import React, { useState } from "react";
import {useHistory} from "react-router-dom";

const Register = () => {

  const history = useHistory();

  const initial = {    
    branchName: "",
    pincode: [],
    place: "",
    userName: "",
    email:"",
    password: "",
    cpassword: "",
  };
  const [branchInfo, setBranchInfo] = useState(initial);

  let name, value;

  const handleInputs = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setBranchInfo({ ...branchInfo, [name]: value });
    console.log(branchInfo);
  };

  const PostData = async (e) =>{

    e.preventDefault();
    const {branchName,pincode,place,userName,email,password,cpassword} = branchInfo;

    const res = await fetch("/branches",{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        branchName,pincode,place,userName,email,password,cpassword
      })
    });

    const data = await res.json();

    if(data.status === 422 || !data){
      window.alert("Registration Failed")
      console.log("Registration failed");
    } else {
      window.alert("Registration Successful")
      console.log("Registration Successful"); 

      history.push("/Login");
    }

  }

  return (
    <div>
      <h1>Register Branch</h1>
      <div>
        <form method="POST">
        <label>BranchName</label>
          <input
            type="text"
            name="branchName"
            id="branchName"
            value={branchInfo.branchName}
            placeholder="Enter branch Name"
            onChange={handleInputs}
          ></input>
          <br/>
          <label>Pincode</label>
          <input
            type="array"
            name="pincode"
            id="pincode"
            value={branchInfo.pincode}
            placeholder="Enter pincode"
            onChange={handleInputs}
          ></input>
          <br/>
          <label>Place</label>
          <input
            type="text"
            name="place"
            id="place"
            value={branchInfo.place}
            placeholder="Enter place of branch"
            onChange={handleInputs}
          ></input>
          <br/>
          <label>Branch Incharge :</label>
          <input
            type="text"
            name="userName"
            id="userName"
            value={branchInfo.userName}
            placeholder="Enter User Name"
            onChange={handleInputs}
          ></input>
          <br/>
          <label>Email :</label>
          <input
            type="text"
            name="email"
            id="email"
            value={branchInfo.email}
            placeholder="Enter User email"
            onChange={handleInputs}
          ></input>
          <br/>
          <label>Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={branchInfo.password}
            placeholder="Enter password you want to assign"
            onChange={handleInputs}
          ></input>
          <label>Confirm Password</label>
          <input
            type="cpassword"
            name="cpassword"
            id="cpassword"
            value={branchInfo.cpassword}
            placeholder="Enter password again"
            onChange={handleInputs}
          ></input>
        </form>
        <button onClick={PostData}>Submit</button>
      </div>
    </div>
  );
};

export default Register;
