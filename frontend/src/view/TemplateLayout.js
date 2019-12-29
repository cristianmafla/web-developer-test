import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { ContextAuth } from '../context/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/index.css';
import "react-datepicker/dist/react-datepicker.css";

export default function TemplateLayout(props) {
	const auth = useContext(ContextAuth);

	const NavAuth = () => {
		const routeMenu = [
			{
				to: '/users',
				viewName: 'Usuarios'
			},
			{
				to: '/jobs',
				viewName: 'Tareas'
			}
		];

		if (auth.authenticated) {
			return (
				<Nav className="mr-auto">
					{routeMenu.map((data, key) => (
						<Link key={key} className="nav_link" to={data.to}>
							{data.viewName}
						</Link>
					))}
				</Nav>
			);
		}

		return <Nav className="mr-auto" />;
	};

	const LoginLogout = () => {
		if (!auth.authenticated) {
			return (
				<Nav>
					<Link to="/" className="nav_link">
						Login
					</Link>
				</Nav>
			);
		}

		return (
			<Nav>
				<Button type="button" onClick={auth.closeSession} className="btn-secondary">
					Logout
				</Button>
			</Nav>
		);
	};

	return (
		<Fragment>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Navbar.Brand>Cristian Andrés Salazar Mafla</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<NavAuth />
					<LoginLogout />
				</Navbar.Collapse>
			</Navbar>
			<Container style={{marginTop:20}}>{props.children}</Container>
		</Fragment>
	);
}
