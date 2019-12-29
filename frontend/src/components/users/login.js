import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { ContextAuth } from '../../context/auth';
import { alert } from '../../utils';
import ModalLogin from '../modal';
import { CREATE_NEW_USER } from '../../utils/variables';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			btnLogin: 'Ingresar',
			newName: '',
			newEmail: '',
			newPass: '',
			newConfirmPass: ''
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
			<Col sm={4} style={{ margin: '0 auto' }} className="container_principal login_form">
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
					<div className="div_btn_registrar">
						<ModalLogin
							title="Registro de usuarios"
							btnOpen="Registrarme"
							closeFunction={() => {}}
							openFunction={() => {}}
						>
							{this.FormRegister()}
						</ModalLogin>
					</div>
				</Form>
			</Col>
		);
	};

	createNewAccount = async () => {
		try {
			const name = this.state.newName;
			const email = this.state.newEmail;
			const password = this.state.newPass;
			const confirmPass = this.state.newConfirmPass;

			console.log('=======name,email,password,confirmPass=======> ', name, email, password, confirmPass);

			if (name && email && password && confirmPass) {
				if (password === confirmPass) {
					const newUser = await axios.post(CREATE_NEW_USER, {
						name,
						email,
						password
					});
					console.log('=======newUser.data.data=======> ', newUser.data.data);

					if (newUser.data.state) {
						this.setState({ email: newUser.data.data.email });
						alert('success', 'Se creó el usuario', 'se creó correctamente un nuevo usuario');
					}
					return;
				}
				alert('error', 'Error de contraseña', 'las constraseñas no coinciden');
				return;
			}

			alert(
				'error',
				'campos vacíos',
				'los campos [ nombre, correo, contraseña , confirmar contraseña] son obligatorios'
			);
		} catch (error) {
			console.log('=======error=======> ', error);
			if (!error.response.data.state) {
				alert('error', 'Error creando el usuario', error.response.data.data);
				return;
			}
			alert('error', 'Error creando el usuario', 'no se pudo crear el usuario,vuelva a intentarlo mas tarde');
		}
	};

	FormRegister = () => {
		return (
			<Form onSubmit={(e) => {}} id="form_register_user">
				<Form.Group controlId="input_name_register">
					<Form.Label>Nombre</Form.Label>
					<Form.Control
						type="text"
						placeholder="Nombre"
						onChange={(e) => this.setState({ newName: e.target.value })}
					/>
				</Form.Group>

				<Form.Group controlId="input_correo_register">
					<Form.Label>Correo</Form.Label>
					<Form.Control
						type="email"
						placeholder="Correo"
						onChange={(e) => this.setState({ newEmail: e.target.value })}
					/>
				</Form.Group>

				<Form.Group controlId="input_pass_register">
					<Form.Label>contraseña</Form.Label>
					<Form.Control
						type="password"
						placeholder="Contraseña"
						onChange={(e) => this.setState({ newPass: e.target.value })}
					/>
				</Form.Group>

				<Form.Group controlId="input_pass_confirm_register">
					<Form.Label>Confirmar contraseña</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirmar contraseña"
						onChange={(e) => this.setState({ newConfirmPass: e.target.value })}
					/>
				</Form.Group>

				<Button variant="primary" type="button" onClick={this.createNewAccount}>
					Registrarme
				</Button>
			</Form>
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

					return <Redirect to="/jobs" />;
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
