import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { ContextAuth } from '../../context/auth';
import { RedirectLogin } from '../utils';

export default function Users() {

	const auth = useContext(ContextAuth);

	if(auth.authenticated){
		return (
			<Fragment>
				<Row >
					<Col>
						<h1>Modulo Usuarios</h1>
					</Col>
				</Row>
				<Row>
					<Col>cuerpo</Col>
				</Row>
			</Fragment>
		);
	}

	return <RedirectLogin/>;

}
