/* global gapi */
import React, { useState, useEffect } from "react";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import Navbar from "../Basic/Navbar";
import "../Dashbaord/dashboard.css";
import Leftside from "../Dashbaord/LeftsidePaciente";

const AgendamentoStatus = () => {
    const [agendamentos, setAgendamentos] = useState([]);
    const [isLoading, setIsLoading] = useState()
    const [filteredAgendamentos, setFilteredAgendamentos] = useState()

    function getMeetLink(id) {
        if(filteredAgendamentos !== undefined){
            const meetCode = filteredAgendamentos.find((apntmnt) => {
                return apntmnt.id === id
            })

            return meetCode ? meetCode.hangoutLink : "#"
        }
        return '#'
    }

    useEffect(() => {
        setIsLoading(true)

        const fetchAgendamentos = async () => {
            var { data } = await Axios.post(
                `${process.env.REACT_APP_SERVER_URL}/patientes/upcoming-agendamentos/`,
                {
                    googleId: localStorage.getItem("googleId"),
                }
            );
            
            // const response = await window.gapi.client.calendar.events.list({
            //     'calendarId': 'primary',
            //     'timeMin': (new Date()).toISOString(),
            //     'showDeleted': false,
            //     'singleEvents': true,
            //     'maxResults': 100,
            //     'orderBy': 'startTime'
            // })

            // // Filter google calendar events
            // const events = response.result.items
            // const filteredEvents = events.filter((event) => {
            //     return data.find((it) => it._id === event.id)
            // })

            console.log(data)
            setAgendamentos(data);
            // console.log(filteredEvents)
            // setFilteredAppointments(filteredEvents)
        };

        fetchAgendamentos()
        setIsLoading(false)
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
                    {isLoading && <h1>Loading</h1>}
                    {!isLoading && <div
                        className="col-9 col-md-9 p-4"
                        style={{
                            border: "15px solid yellow ",
                            height: "80vh",
                            backgroundColor: "#6c757d",
                        }}
                    >
                        <table className="table table-hover table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Doctor Name</th>
                                    <th scope="col">Meet Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {agendamentos.map((Agendamento) => (
                                    <tr key={Agendamento._id}>
                                        <th scope="row">{Agendamento.date}</th>
                                        <th scope="row">{Agendamento.slotTime}</th>
                                        <th scope="row">{Agendamento.doctorName}</th>
                                        <th scope="row"> <a href={Agendamento.googleMeetLink} target="_blank">Join Meet</a></th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> }
                </div>
            </div>
        </div>
    );
};

export default AgendamentoStatus;