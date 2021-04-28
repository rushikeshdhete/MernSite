import React, { useEffect, useState } from "react";
import catImage from "../image/cat1.jpg";
import {useHistory} from "react-router-dom";

const About = ()=>{

    const history = useHistory();
    const [userData, setUserData] = useState({});

    const callAboutPage = async ()=>{
        try{
            const res = await fetch('/about', {
                method:"GET", 
                headers:{
                    Accept:"appllication/json",
                    "Content-Type" : "application/json"
                },
                credentials:"include"
            })
            // console.log((await res).status);

            const data = await res.json();
            // console.log(data);
            setUserData(data);
            // console.log(res.status);
            if(res.status === 401){
                const error = new Error(res.error);
                throw error;
            }

        }catch(error){
            console.log(error);
            history.push("/login");
        }
    }

    useEffect(()=>{
        callAboutPage();
    }, []);

    const inputProfile = (e) =>{
        e.preventDefault();
    }
    
    return(
        <>

            <div className="container">
            <form method="GET">
            <div className="row mt-md-5">
                
                <div className="col-md-4">
                <div className="profile-img">
                <img src={catImage} alt="cat"></img>

                </div>
                
                </div>

                <div className="col-md-6">
                    <div className="profile-head">
                    <h5>{userData.name}</h5>
                    <h6>{userData.work}</h6>

                    <div className="mt-md-5">
                    <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" role="tab" href="#About">About</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" role="tab" href="#Profile">Timeline</a>
                    </li>
                    </ul>
                    </div>
                    </div>
                </div>

                <div className="col-md-2">
                <input type="submit" name="btnAddMore" onClick={inputProfile} className="btn-block" value="Edit Profile"></input>
                </div>
            </div>

            <div className="row">

                <div className="col-md-4">
                    <div className="profile-work">
                    {/* <p className="mt-md-3">Work link</p>  */}
                    {/* <a href="https://codeforces.com/" target="_balnk">codeforces</a><br></br>
                    <a href="https://codeforces.com/" target="_balnk">codeChef</a><br></br>
                    <a href="https://codeforces.com/" target="_balnk">Instagram</a><br></br>
                    <a href="https://codeforces.com/" target="_balnk">Facebook</a><br></br>
                    <a href="https://codeforces.com/" target="_balnk">Github</a><br></br> */}
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="tab-content">

                        <div class="tab-content">
                            <div id="About" class="tab-pane fade show active">
                            <div className="row">
                            <div className="col-md-6" >
                                <label>User ID</label>
                            </div>
                            <div className="col-md-6" >
                                <p>{userData._id}</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6" >
                                <label>Name</label>
                            </div>
                            <div className="col-md-6" >
                                <p>{userData.name}</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6" >
                                <label>Email</label>
                            </div>
                            <div className="col-md-6" >
                                <p>{userData.email}</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6" >
                                <label>Phone</label>
                            </div>
                            <div className="col-md-6" >
                                <p>{userData.phone}</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6" >
                                <label>Profession</label>
                            </div>
                            <div className="col-md-6" >
                                <p>{userData.work}</p>
                            </div>
                        </div>

                        </div>

                            <div id="Profile" class="tab-pane fade in active">
            
                            <p className="text-danger">Under Work</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>



            </form>

            </div>        

        </>
    );
}

export default About;