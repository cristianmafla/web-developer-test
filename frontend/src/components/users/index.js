import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import { ContextAuth } from '../../context/auth';
import { RedirectLogin } from '../utils';
import { TOTAL_USER } from '../../utils/variables';
import { alert } from '../../utils';

export default function Users() {
	const auth = useContext(ContextAuth);
	const [ totalUsers, setTotalUsers ] = useState([]);

	useEffect(() => {
		(async () => {
			const { data } = await axios.get(TOTAL_USER);
			if (data.state) {
				setTotalUsers(data.data);
				return;
			}
			alert('info', 'No existen usuarios', 'no existen usuarios registrados actualmente');
		})();
	}, []);

	const TableUsers = () => {
		if (totalUsers.length > 0) {
			return (
				<Table responsive>
					<thead>
						<tr>
							<th>id</th>
							<th>Nombre</th>
							<th>Correo</th>
							<th>Fecha de Registro</th>
						</tr>
					</thead>
					<tbody>
						{totalUsers.map((data, key) => {
							return (
								<tr>
									<td>{data.id}</td>
									<td>{data.name}</td>
									<td>{data.email}</td>
									<td>{moment(data.createdAt).format('DD/MM/YYYY')}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			);
		}

		return <h3>No hay usuarios actualmente registrados</h3>;
	};

	if (auth.authenticated) {
		return (
			<Fragment>
				<Row>
					<Col>
						<h1>Modulo Usuarios</h1>
					</Col>
				</Row>
				<Row>
					<Col sm={6} className="container_principal" style={{ margin: '0 auto' }}>
						<TableUsers />
					</Col>
				</Row>
			</Fragment>
		);
	}

	return <RedirectLogin />;
}
