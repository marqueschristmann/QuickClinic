import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { Container, Row, Col, Card, Form, CardHeader, CardBody, FormGroup, CardFooter, Button, Label, Input } from 'reactstrap'
import api from '../services/api';
import { AuthContext } from '../Auth/AuthContext';

const LoginForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [status, setStatus] = useState(0);
	const { token, setToken, googleId, setGoogleId } = useContext(AuthContext);
	const history = useHistory();

	async function login() {
		try {
			const res = await api.post( '/login',
				{
					username: username,
					password: password
				}
			)
			setStatus(res.status);

			const token = res.data.token;

			if (res.status === 200) {
				window.localStorage.setItem("token", token);

				// Remove the googleId if it exisits in the local storage
				window.localStorage.removeItem("googleId");
				setGoogleId(null);
				setToken(token);
				history.push('/clinica');
			}
		} catch (err) {
			console.log(err);
		}
	}

	if (token && !googleId) {
		return <Redirect to="/clinica" />
	}
	return (
		<Container className='text-center'>
			<Row>
				<Col lg={6} className='offset-lg-3 mt-5 '>
					<Card>
						<Form>
							<CardHeader className=''>Bem-vindo de volta, Clinica</CardHeader>
							<CardBody >
								<FormGroup row>
									<Label for='email' sm={3}>
										Username
									</Label>
									<Col sm={9}>
										<Input
											type='text'
											name='username'
											id='username'
											placeholder='provide your username'
											onChange={(e) => setUsername(e.target.value)}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for='password' sm={3}>
										Password
									</Label>
									<Col sm={9}>
										<Input
											type='password'
											name='password'
											id='password'
											placeholder='your password here'
											onChange={(e) => setPassword(e.target.value)}
											onKeyPress={(target) => {
												if (target.charCode === 13) {
                          							login();
                        					}
											} }
										/>
									</Col>
								</FormGroup>
								{status === 201 && <p className="warning" style={{ color: "red", fontSize: "15px" }}>Nome de usuário ou senha incorretos! Por favor, tente novamente</p>}
							</CardBody>
							<CardFooter>
								<Button block color="primary" onClick={login}>
								Entrar
								</Button>
							</CardFooter>
						</Form>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default LoginForm;