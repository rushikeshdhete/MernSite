import React , {useEffect, useState} from "react";

const Contact = ()=>{

    const [userData, setUserData] = useState({
        name : "",
        email : "",
        phone : "",
        message : "",
    });

   

    const callContactPage = async ()=>{
        try{
            const res = await fetch('/getdata', {
                method:"GET", 
                headers:{
                    // Accept:"appllication/json",
                    "Content-Type" : "application/json"
                },
                // credentials:"include"
            })
            // console.log((await res).status);

            const data = await res.json();
            // console.log(data);
            setUserData({...userData, name : data.name, email : data.email, phone: data.phone });
            // console.log(res.status);
            if(res.status === 401){
                const error = new Error(res.error);
                throw error;
            }

        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        callContactPage();
    }, []);
    

    const SendMsg = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setUserData({
            ...userData ,
            [name] : value,
        })
    }
    
    const contactForm = async (e)=>{
        e.preventDefault();

        const {name, email, phone , message} = userData;

        const res = await fetch('/contact', {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                name, email, phone, message
            })
        })

        const data = await res.json();
        if(!data)
        {
            console.log("msg not send");
        }else{
            alert("Message Send");
            setUserData({...userData, message:""})
        }
    }

    return(
        <>
        <div className="contact-info">
            <div className="container0-fluid">
                <div className="row justify-content-between mt-lg-5 ">
                    <div className="col-lg-4 text-center">
                        <h4>Phone</h4>
                        <p>8262960242</p>
                    </div>
                    <div className="col-lg-4 text-center">
                        <h4>Email</h4>
                        <p>rushikeshdhete@gmail.com</p>
                    </div>
                    <div className="col-lg-4 text-center">
                        <h4>Address</h4>
                        <p>Pune, Maharashtra</p>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="col-lg-10 offset-1 mt-5">
                    <h3 className="text-center">contact Me</h3>
                    <form className="mt-4" method="POST">
                        <div class="row">
                            <div class="col">
                            <input onChange={SendMsg} value={userData.name} type="text" class="form-control" name="name" required="true"  placeholder="Your Name"/>
                            </div>
                            <div class="col">
                            <input onChange={SendMsg} value={userData.email} type="email" class="form-control" name="email" required="true"  placeholder="Your Email"/>
                            </div>
                            <div class="col">
                            <input onChange={SendMsg} value={userData.phone} type="tel" class="form-control" name="phone" required="true"  placeholder="Your phone Number"/>
                            </div>
                        </div>
                        <div class="form-group mt-3">
                            <textarea onChange={SendMsg} value={userData.message} class="form-control" name="message" placeholder="Message" rows="7" ></textarea>
                        </div>
                        <button onClick={contactForm} type="submit" className="btn btn-primary" >Send Message</button>
                    </form>
                </div>
            </div>    
        </div>
        </>
    );
}

export default Contact;