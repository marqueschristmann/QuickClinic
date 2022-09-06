import React from "react";
import Card from "./Card";

import clinicalogin from "../image/doctorlogin.png";
import pacientelogin from "../image/patientlogin.png";

const LoginButton = () => {
  return (
    <div className="d-flex flex-md-row flex-column justify-content-around align-items-center my-4">
      <Card Image={clinicalogin} link={"/clinicalogin"} />
      <Card
        LoginButton="Paciente"
        Image={pacientelogin}
        link={"/paciente"}
        login="Paciente"
      />
    </div>
  );
};

export default LoginButton;

// <div
//   className="row "
//   style={{
//     maxWidth: "100%",
//     padding: "10px",
//     margin: "10px",
//     marginLeft: "190px",
//   }}
// >
//   <div className="col-12 col-md-6 mb-4  ">
//     <Card Image={doctorlogin} link={"/doctorlogin"} />
//   </div>
//   <div className="col-12 col-md-6 mb-4">
//     <Card
//       LoginButton="Patient"
//       Image={patientlogin}
//       link={"/patient"}
//       login="Patient"
//     />
//   </div>
// </div>
