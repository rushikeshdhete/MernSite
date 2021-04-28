import React , {useEffect, useState} from "react";

const Home = ()=>{

    const [userName, setUserName] = useState({
        name : "",
    });

    const [show , setShow] = useState(false);

    const callHomePage = async ()=>{
        try{
            const res = await fetch('/getdata', {
                method:"GET", 
                headers:{
                    "Content-Type" : "application/json"
                },
            
            })

            const data = await res.json();
          
            setUserName( data) ;
            setShow(true);

            if(res.status === 401){
                const error = new Error(res.error);
                throw error;
            }

        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        callHomePage();
    }, []);

    return(
        <>
            <div className="container-fluid">
                    <div className="text-center mt-5">
                        <h6 className="text-info">Welcome</h6>
                        <h2 className="text-danger font-weight-bold ">{userName.name}</h2>
                        {/* <h4>This is <span className="text-danger font-weight-bold ">RUSHIKESH DHETE</span></h4> */}
                        <p>{show ? <h4 className="text-">Happy to see you</h4> : <h4> We are the MERN Stack Developer</h4>}</p>
                    </div>
            </div>
        </>
    );
}

export default Home;