import React from 'react';
import Footer from '../Basic/Footer';
import Navbar from '../Basic/Navbar';
import LoginForm from '../Clinicalogin/LoginForm';


const ClinicaLogin=()=>{

    return(
        <div >
            <div style={{height: "71vh"}}>
            <Navbar/>
            <LoginForm/>
            </div>
           
            <div className="fixed-bottom" style={{width: "100%"}}>
            <Footer />
            </div>
            
        </div>
    )

}

export default ClinicaLogin;