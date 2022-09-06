import React from "react";
import { Link } from "react-router-dom";

 const Footer=()=> {
   
    return (
      
        
          <div className=" row text-light  p-2" 
          style={{maxWidth:"100%",margin:"auto",  backgroundColor: "#D0D8D9"}}>
         
         <div className="col-12 col-md-6 w-100">
         <h4 className="white-text">Contatos</h4>
                     <p className="grey-text">
                         marqueschristmann82gmail.com
                     </p>
                     <p className="grey-text">
                        +55 84 8889879
                     </p>
           
         </div>

         <div className="col-12 col-md-6 w-100">
         <h4 className="white-text">Redes socias</h4>
                     <ul>
                         <li><Link to="#!"className="grey-text"> Facebook</Link></li>
                         <li><Link to="#!"className="grey-text"> Instagram</Link></li>
                         <li><Link to="#!"className="grey-text"> Twitter</Link></li>
                     </ul>
         </div>
</div>
          
      
    );
  }

export default Footer;
