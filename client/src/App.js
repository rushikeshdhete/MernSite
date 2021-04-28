import React , {createContext, useReducer} from  "react";
import {Route, Switch} from "react-router-dom";
import Navbar from "./compoenets/Navbar";
import Home from "./compoenets/Home";
import About from "./compoenets/About";
import Contact from "./compoenets/Contact";
import Login from "./compoenets/Login";
import Signup from "./compoenets/Signup";
import Logout from "./compoenets/Logout"
import 'bootstrap/dist/css/bootstrap.css';


import {initialState, reducer } from "../src/reducer/UseReducer";


// 1) contex App
export const userContext = createContext();


const Routing = ()=>{
  return (
    <Switch>
  <Route exact path="/" >
    <Home/>
  </Route>

  <Route path="/about">
    <About/>
  </Route>

  <Route path="/contact">
    <Contact/>
  </Route>

  <Route path="/login">
    <Login/>
  </Route>

  <Route path="/signup">
    <Signup/>
  </Route>

  <Route path="/logout">
    <Logout/>
  </Route>

  </Switch>
  );
} 

const App = ()=>{

  
  const [state, dispatch] = useReducer(reducer, initialState);
  

  return(
    <>
    <userContext.Provider value = {{state, dispatch }}>
    <Navbar/>
    <Routing/>
    </userContext.Provider>
    </>
  );
}

export default App;