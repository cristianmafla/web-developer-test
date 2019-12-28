import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/index.css';

export default function TemplateLayout(props) {
	
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

		return (
			<Nav className="mr-auto">
				{routeMenu.map((data, key) => (
					<Link key={key} className="nav_link" to={data.to}>
						{data.viewName}
					</Link>
				))}
			</Nav>
		);
	};

	const LoginLogout = () => {
		return (
			<Nav>
				<Nav.Link eventKey={2} href="#memes" onClick={() => console.log('==============> ')	}>
					logout
				</Nav.Link>
			</Nav>
		);
	};

	return (
		<Fragment>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Navbar.Brand>DEVELOP TEST Cristian Mafla</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<NavAuth />
					<LoginLogout />
				</Navbar.Collapse>
			</Navbar>
			<Container className="container_principal">{props.children}</Container>
		</Fragment>
	);
}
