import React, {useContext, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockIcon from '@material-ui/icons/Lock';

import {userContext} from "../App";

const Login = ()=>{

    const {state, dispatch} = useContext(userContext);

    const history = useHistory();
    const [login, setLogin] = useState({
        email:"",
        password:""
    });

    const inputInfo = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setLogin((previous)=>{
            return {...previous, [name]:value}
        });
    }

    const UserLogin = async (e)=>{
        e.preventDefault();

        const {email, password} = login;

        const res = await fetch("/signin",{
            method : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                email, password
            })
        });

        const data = await res.json();

        if(res.status === 400 || !data)
        {
            window.alert("INVALID INFO");
        }else if(res.status === 200){

            dispatch({type:"USER", payload:true});

            window.alert("LOGIN SUCCESSFUL");
            history.push("/");
        }

    }
    
    return(
        <>
        <section className="sign-in">
            <div className="container  mt-md-5 offset-3">
            <form method="POST">
                <div className="form-group form-row">
                    <div className="col-md-1 pl-md-5">
                    <AccountBoxIcon/>
                    </div>
                    <div className="col-md-7">
                    <input type="email" className="form-control" name="email"  placeholder="Your Email" onChange={inputInfo} value={login.email}/>
                    </div>
                </div>
                <div className="form-group form-row">
                    <div className="col-md-1 pl-md-5">
                    <LockIcon/>
                    </div>
                    <div className="col-md-7">
                    <input type="password" className="form-control" name="password" placeholder="Password" onChange={inputInfo} value={login.password}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary offset-1" onClick={UserLogin}>Login</button>
                </form>
                <div className="mt-md-3">
                    <NavLink to="/signup" className="offset-1">Create Account</NavLink>
                </div>

            </div>

        </section>
        </>
    );
}

export default Login;