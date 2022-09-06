import React, { useState, useEffect } from "react";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import Scrollbar from "react-scrollbars-custom";
import Navbar from "../Basic/Navbar";
import "../Dashbaord/dashboard.css";
import StarPicker from 'react-star-picker';
import Leftside from "../Dashbaord/LeftsideClinica";
import { Link } from "react-router-dom";

const CliAgendamentos = () => {

  //   console.log(decoded);

  const [Agendamentos, setAgendamentos] = useState([]);

  const fetchAgendamentos = async () => {

    var token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    const { data } = await Axios.post(
      `${process.env.REACT_APP_SERVER_URL}/clinicas/previous-agendamentos/`,
      {
        clinicaId: decoded._id,
      }
    );
    // console.log(data);
    setAgendamentos(data);
  };

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  return (
    <div className="bg-dark" style={{ height: "100vh" }}>
      <Navbar />
      <div>
        <div className="row m-5" style={{ maxWidth: "100%" }}>
          <div
            className="col-3 col-md-3 p-4 bg-white "
            style={{ height: "80vh" }}
          >
            <Leftside />
          </div>
          <div
            className="col-9 col-md-9 p-3"
            style={{
              border: "15px solid yellow ",
              height: "80vh",
              backgroundColor: "#6c757d",
            }}
          >
            <Scrollbar
              noScrollX
              style={{ position: "", height: "73vh", width: "150vh" }}
              className="col-12 col-md-12"
            >
              <table className="table table-hover table-dark">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Paciente Name</th>
					<th scope="col" style={{textAlign:'center'}}>Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {Agendamentos.map((Agendamento) => (
                    <tr>
                      <th scope="row">{Agendamento.date}</th>
                      <th scope="row">{Agendamento.slotTime}</th>
                      <th scope="row">{Agendamento.pacienteName}</th>
					  {Agendamento.feedback.given ? <th scope="row" style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
						  <StarPicker value={Agendamento.feedback.stars} size="20"></StarPicker>
						  <Link to={`/clinica/feedback/${Agendamento._id}`}>Details</Link>
					  </th> : <th scope="row" style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>-</th>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Scrollbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CliAgendamentos;
