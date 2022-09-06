import React from "react";
import Option from "./Option";
import "./dashboard.css";
import { Link } from "react-router-dom";

const LeftsideClinica = () => {
  return (
    <div>
      <ul className="mt-5">
        <li>
          <Link to="/Clinica">
            <Option Value="Today's Schedule" Option="today" />
          </Link>
        </li>
        <li style={{ textDecoration: "none" }}>
          <Link to="/clinica/perosnaldetails">
            <Option Value="Personal Details" />
          </Link>
        </li>

        <li style={{ textDecoration: "none" }}>
          <Link to="/clinica/payment-history">
            <Option Value="Previous Agendamentos" />
          </Link>
        </li>

        {/* <li style={{ textDecoration: "none" }}>
          <Link to="/doctor/feedback">
            <Option Value="Feedback" />
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default LeftsideClinica;
