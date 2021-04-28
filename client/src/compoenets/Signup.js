import React, { useState } from "react";
import {NavLink, useHistory} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import WorkIcon from '@material-ui/icons/Work';
import LockIcon from '@material-ui/icons/Lock';

const Signup = ()=>{
    const history = useHistory();
    const [user, setUser] = useState({
        name : "",
        email : "",
        phone : "",
        work : "",
        password : "",
        cpassword : "",
    });


    const handlenput = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setUser(previous=>{
            return{
                ...previous, 
                [name]:value
            }
        })
    }

    const PostData = async (event)=>{
        event.preventDefault();
        const {name, email, phone, work, password, cpassword} = user;

        const res = await fetch("/register", {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });

        const data = await res.json();
        
        if(res.status === 422 || !data){
            window.alert("INVALID REGESTER");
            console.log("INVALID REGESTER");
        } 
        else if(res.status === 201)
        {
            window.alert("REGESTERD SUCCESSFULLY");
            console.log("REGESTERD SUCCESSFULLY")
            history.push("/login");
        }
    } 

    return(
        <>
        <section classNameName="signup">
            <div className="container mt-md-5 offset-3">
                <div className="signup-content ">
                <form method="POST" >
                <div className="form-group form-row">
                    <div className="col-md-1 pl-md-5">
                    <AccountCircleIcon/>
                    </div>
                    <div className="col-md-7">
                    <input type="text" 
                        className="form-control" 
                        name="name" 
                        placeholder="Your Name" 
                        onChange={handlenput} 
                        value={user.name}/>
                    </div>
                </div>
                <div className="form-group form-row">
                    <div className="col-md-1 pl-md-5">
                    <EmailIcon/>
                    </div>
                    <div className="col-md-7">
                    <input type="email" 
                        className="form-control" 
                        name="email" 
                        placeholder="Your Email" 
                        onChange={handlenput} 
                        value={user.email}/>
                    </div>
                </div>
                <div className="form-group form-row">
                    <div className="col-md-1 pl-md-5">
                    <PhoneIcon/>
                    </div>
                    <div className="col-md-7">
                    <input type="tel" 
                        className="form-control" 
                        name="phone" 
                        maxLength="10" 
                        placeholder="Phone Number" 
                        onChange={handlenput} 
                        value={user.phone}/>
                    </div>
                </div>
                <div className="form-group form-row">
                    <div className="col-md-1 pl-md-5">
                    <WorkIcon/>
                    </div>
                    <div className="col-md-7">
                    <input type="text" 
                        className="form-control" 
                        name="work" 
                        placeholder="Your Profession" 
                        onChange={handlenput} 
                        value={user.work}/>
                    </div>
                </div>
                <div className="form-group form-row">
                    <div className="col-md-1 pl-md-5">
                    <LockIcon/>
                    </div>
                    <div className="col-md-7">
                    <input type="password" 
                        className="form-control" 
                        name="password" 
                        placeholder="Password" 
                        onChange={handlenput} 
                        value={user.password}/>
                    </div>
                </div>
                <div className="form-group form-row">
                    <div className="col-md-1 pl-md-5">
                    <LockIcon/>
                    </div>
                    <div className="col-md-7">
                    <input type="password" 
                        className="form-control" 
                        name="cpassword" 
                        placeholder="Conform Password" 
                        onChange={handlenput} 
                        value={user.cpassword}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary offset-1" onClick={PostData}>SignUp</button>
                </form>
                <div className="mt-md-3 offset-1 ">
                    <NavLink to="/login">Already Register</NavLink>
                </div>

               
                </div>
            </div>
        </section>
        </>
    );
}

export default Signup;