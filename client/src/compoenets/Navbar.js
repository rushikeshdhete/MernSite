import React, {useContext} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink} from "react-router-dom";

import {userContext} from "../App";

const Navbar = ()=>{
  const {state, dispatch} = useContext(userContext);

  const RenderMenue = () =>{
    // console.log(state);
    if(state){
      return (
        <>
        <li className="nav-item active">
        <NavLink className="nav-link mr-md-2" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link mr-md-2" to="/about">About</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link mr-md-2" to="/contact">Contact</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link mr-md-2" to="/logout">Logout</NavLink>
      </li>
        </>
      );
    }else{
      return(
        <>
        <li className="nav-item active">
        <NavLink className="nav-link mr-md-2" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link mr-md-2" to="/about">About</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link mr-md-2" to="/contact">Contact</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link mr-md-2" to="/login">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link mr-md-2" to="/signup">Signup</NavLink>
      </li>
        </>
      );
    }
  }

    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <NavLink className="navbar-brand ml-md-5" to="/">Rushikesh</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">

      <RenderMenue/> 
    
    </ul>
  </div>
</nav>
        </>
    );
}

export default Navbar;