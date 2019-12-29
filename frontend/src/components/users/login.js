import React, { Component, Fragment, useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { ContextAuth } from '../../context/auth';
import { alert } from '../../utils';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			btnLogin: 'Ingresar'
		};
	}

	submitLogin = async (e, startSession) => {
		e.preventDefault();
		try {
			this.setState({ btnLogin: 'Ingresando...' });

			if (this.state.email && this.state.password) {
				await startSession(this.state.email, this.state.password);
				this.setState({ email: '', password: '' });
				this.setState({ btnLogin: 'Ingresar' });
				return;
			}

			alert('error', 'campos vacios', 'los campos Email y Password son obligatorios');
			this.setState({ btnLogin: 'Ingresar' });
		} catch (error) {
			console.log('=======error==s====> ', error);
			this.setState({ btnLogin: 'Ingresar' });
			if (error.response.data) {
				alert('error', 'Error auntenticando', error.response.data.data);
				return;
			}

			alert('error', 'Error auntenticando', 'ocurrio un error mientras se autenticaba, intente mas tarde');
		}
	};

	FormLogin = (startSession) => {
		return (
			<Col sm={4} style={{ margin: '0 auto' }} className="container_principal">
				<h3>Login de usuarios</h3>
				<Form onSubmit={(e) => this.submitLogin(e, startSession)}>
					<Form.Group controlId="email_control">
						<Form.Label>Correo</Form.Label>
						<Form.Control
							type="email"
							autoComplete="off"
							placeholder="Correo"
							onChange={(e) => this.setState({ email: e.target.value })}
							value={this.state.email}
						/>
					</Form.Group>

					<Form.Group controlId="password_control">
						<Form.Label>Contraseña</Form.Label>
						<Form.Control
							type="password"
							placeholder="Contraseña"
							autoComplete="off"
							onChange={(e) => this.setState({ password: e.target.value })}
							value={this.state.password}
						/>
					</Form.Group>

					<Button
						variant="primary"
						type="submit"
						disabled={this.state.btnLogin === 'Ingresar' ? false : true}
					>
						{this.state.btnLogin}
					</Button>

					<Button
						variant="primary"
						type="button"
						className="btn-secondary btn_clear_login"
						onClick={() => {
							this.setState({
								email: '',
								password: ''
							});
							document.getElementById('email_control').focus();
						}}
					>
						Limpiar
					</Button>
				</Form>
			</Col>
		);
	};

	render() {
		return (
			<ContextAuth.Consumer>
				{({ authenticated, user, startSession, closeSession }) => {
					
					if (!authenticated) {
						return (
							<Row>
								<Col>{this.FormLogin(startSession)}</Col>
							</Row>
						);
					}

					return <Redirect to='/jobs'/>;

				}}
			</ContextAuth.Consumer>
		);
	}
}

// export default function Login(props) {
// 	const auth = useContext(ContextAuth);

// 	const [ email, setEmail ] = useState('');
// 	const [ password, setPassword ] = useState('');

// 	useEffect(() => () => {}, [ email, password ]);

// 	const submitLogin = async (e) => {
// 		e.preventDefault();
// 		try {
// 			if (email && password) {
// 				await auth.startSession(email, password);
// 				setEmail('');
// 				setPassword('');
// 				return;
// 			}

// 			alert('error', 'campos vacios', 'los campos Email y Password son obligatorios');
// 		} catch (error) {
// 			console.log('=======error==s====> ', error);
// 			if (error.response.data) {
// 				alert('error', 'Error auntenticando', error.response.data.data);
// 				return;
// 			}

// 			alert('error', 'Error auntenticando', 'ocurrio un error mientras se autenticaba, intente mas tarde');
// 		}
// 	};

// 	const FormLogin = () => {
// 		return (
// 			<Form onSubmit={(e) => submitLogin(e)}>
// 				<Form.Group controlId="email">
// 					<Form.Label>Email</Form.Label>
// 					<Form.Control
// 						id="input_email"
// 						type="email"
// 						placeholder="Enter email"
// 						onChange={(e) => {
// 							document.getElementById('input_email').focus()
// 							setEmail(e.target.value)
// 						}}
// 						value={email}
// 					/>
// 				</Form.Group>

// 				<Form.Group controlId="password">
// 					<Form.Label>Password</Form.Label>
// 					<Form.Control
// 						type="password"
// 						placeholder="Password"
// 						onChange={(e) => setPassword(e.target.value)}
// 						value={password}
// 					/>
// 				</Form.Group>

// 				<Button variant="primary" type="submit">
// 					Submit
// 				</Button>
// 			</Form>
// 		);
// 	};

// 	if (!auth.authenticated) {
// 		return (
// 			<Row>
// 				<Col>
// 					<FormLogin />
// 				</Col>
// 			</Row>
// 		);
// 	}

// 	return (
// 		<Row>
// 			<Col>
// 				<h2>Bienvenido :{auth.user.name}</h2>
// 				<Link to="/jobs" className="">
// 					ir a Tareas
// 				</Link>
// 			</Col>
// 		</Row>
// 	);
// }
