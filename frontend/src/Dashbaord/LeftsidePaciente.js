import React from "react";
import Option from "./Option";
import "./dashboard.css";
import { Link } from "react-router-dom";

const LeftsidePaciente = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/paciente">
            <Option Value="Personal Details" />
          </Link>
        </li>
        <li>
          <Link to="/paciente/searchclinica">
            <Option Value="Search Clinica" />
          </Link>
        </li>
        <li>
          <Link to="/paciente/agendamento-status">
            <Option Value="Agendamento Status" />
          </Link>
        </li>

        <li>
          <Link to="/paciente/previousagendamentos">
            <Option Value="Previous Agendamentos" />
          </Link>
        </li>

       
      </ul>
    </div>
  );
};

export default LeftsidePaciente;
