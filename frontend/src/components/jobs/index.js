import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

export default function Jobs() {
	const [ dataJobs, setDataJobs ] = useState([]);

	useEffect(() => {
		(async () => {
			const totalJobs = await axios.get(`http://localhost:8080/users`);
			setDataJobs(totalJobs.data);
		})();
	}, []);

	return (
		<Fragment>
			<Row>
				<Col>
					<h1>Modulo Tareas</h1>
				</Col>
			</Row>
			<Row>
				<Col>{dataJobs.map((data,key) => <div key={key}>{data.fieldString}</div>)}</Col>
			</Row>
		</Fragment>
	);
}
