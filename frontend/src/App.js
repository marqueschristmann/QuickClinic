/* global gapi */
import React, { useEffect, useState } from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import ClinicaLogin from "./Pages/ClinicaLogin";
import PacienteLogin from "./Pages/PacienteLogin"
import ClinicaDashboard from "./Pages/ClinicaDashboard";
import PersonalDetails from "./Pages/PacienteDashboard";
import Error from "./Pages/Error";
import { AuthContext } from "./Auth/AuthContext";
import PhoneNumber from "./components/PhoneNumber";
import CLIPersonalDetails from "./Clinica/CLIPersonalDetails";
import SearchClinica from "./Paciente/SearchClinica";
import PacienteAgendamentos from "./Paciente/PerviousAgendamentos";
import Spinner from "react-bootstrap/Spinner";
import Selectdate from "./Paciente/Selectdate";
import BookingSlots from "./Clinica/BookingSlots";
import Payment from "./Paciente/Payment";
import CliAgendamentos from "./Clinica/PaymentHistory";
import AgendamentoStatus from "./Paciente/AgendamentoStatus";
import Pfeedback from './Paciente/Feedback';
import FeedbackDetails from './Clinica/FeedbackDetails';


function App() {
	const [token, setToken] = useState(window.localStorage.getItem("token"));
	const [googleId, setGoogleId] = useState(
		window.localStorage.getItem("googleId")
	);

	const [apiLoaded, setApiLoaded] = useState(false);

// Para carregar apenas quando o gapi estiver carregado
	useEffect(() => {
		if (window.gapi !== undefined) {
			setApiLoaded(false);
			window.gapi.load("client:auth2", initClient);
			function initClient() {
				window.gapi.client
					.init({
						apiKey: process.env.REACT_APP_API_KEY,
						clientId: process.env.REACT_APP_CLIENT_ID,
						discoveryDocs: [process.env.REACT_APP_DISCOVERY_DOCS],
						scope: process.env.REACT_APP_SCOPE,
					})
					.then(
						function () {
							if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
								console.log(
									`Is signed in? ${window.gapi.auth2
										.getAuthInstance()
										.isSignedIn.get()}`
								);
							} else {
								console.log("Currently Logged Out!!");
							}
							setApiLoaded(true);
						},
						function (error) {
							console.log(`error ${JSON.stringify(error)}`);
							setApiLoaded(true);
						}
					);
			}
			setApiLoaded(true);
		} else {
			console.log("[Google] dentro da linha de bloco else 54 App.js");
			setApiLoaded(false);
		}

	}, []);

	return apiLoaded ? (
		<Router>
			<AuthContext.Provider value={{ token, setToken, googleId, setGoogleId }}>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/clinicalogin" component={ClinicaLogin} />
					<Route exact path="/pacientelogin" component={PacienteLogin} />
					<Route exact path="/paciente" component={PersonalDetails} />
					<Route exact path="/clinica" component={ClinicaDashboard} />
					<Route exact path="/paciente/searchclinica" component={SearchClinica} />
					<Route exact path="/paciente/update-phone" component={PhoneNumber} />
					<Route
						exact
						path="/paciente/previousagendamentos"
						component={PacienteAgendamentos}
					/>
					<Route
						exact
						path="/clinica/perosnaldetails"
						component={CLIPersonalDetails}
					/>
					<Route
						exact
						path="/clinica/payment-history"
						component={CliAgendamentos}
					/>
					<Route exact path="/clinica/feedback/:id" component={FeedbackDetails} />

					<Route exact path="/paciente/selectdate" component={Selectdate} />
					<Route exact path="/paciente/book-slot" component={BookingSlots} />
					<Route exact path="/paciente/payment" component={Payment} />
					<Route exact path="/paciente/appointment-status" component={AgendamentoStatus} />
					<Route exact path="/paciente/feedback/:id" component={Pfeedback} />

					<Route path="*">
						<Error />
					</Route>
				</Switch>
			</AuthContext.Provider>
		</Router>
	) : (
		<div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
			<Spinner animation="border" variant="danger" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>
		</div>
	);
}

export default App;
