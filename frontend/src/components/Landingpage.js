import React from 'react'
import { Link } from 'react-router-dom'
// import { useForm } from "react-hook-form";
import NewCust from './NewCust';

const Landingpage = () => {    
  return (
    <div>
        <h1>Scaaaavenger Hunt</h1>
        <Link to='/Login'>Login</Link>
        <br/>
        <Link to='/Register'>Register Branch</Link>
        <NewCust/>
    </div>
  )
}

export default Landingpage
