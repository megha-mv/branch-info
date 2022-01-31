import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import Landingpage from './components/Landingpage';
import Login from './components/Login';
import Register from './components/Register';
import LoggedUser from './components/LoggedUser';
import './App.css'


function App() {
  return (
    <div >
      <Switch>
        <Route exact path="/" component={Landingpage} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/LoggedUser" component={LoggedUser} />
      </Switch>
    </div>
  );
}

export default App;
