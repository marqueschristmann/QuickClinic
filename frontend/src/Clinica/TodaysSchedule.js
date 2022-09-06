import React, { useState, useEffect } from "react";
import Axios from "axios";
import jwt_decode from "jwt-decode";

const TodaysSchedule = () => {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      var token = localStorage.getItem("token");
      var decoded = jwt_decode(token);
      const { data } = await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/clinicas/todays-agendamentos`,
        {
          clinicaId: decoded._id,
        }
      );

      setAgendamentos(data);
      console.log(data);
    };

    fetchAgendamentos();
  }, []);

  return (
    <table className="table table-hover table-dark">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Paciente Name</th>
          <th scope="col">Meet Link</th>
        </tr>
      </thead>
      <tbody>
        {agendamentos.map((agendamento) => (
          <tr key={agendamento._id}>
            <th scope="row">{agendamento.date}</th>
            <th scope="row">{agendamento.slotTime}</th>
            <th scope="row">{agendamento.pacienteName}</th>
            <th scope="row"><a href={agendamento.googleMeetLink} target="_blank">Participar do Meet</a></th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodaysSchedule;
