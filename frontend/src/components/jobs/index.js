import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Selection from 'react-select';
import { ContextAuth } from '../../context/auth';
import { USER_AND_JOBS, UPDATE_JOB, DELETE_JOB } from '../../utils/variables';
import WindowModal from '../modal';
import { RedirectLogin } from '../utils';
import { getToken, alert, alertDeleteJob } from '../../utils';

export default class Jobs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataJobs: [],
			name: '',
			description: '',
			expirationDate: null,
			selectValue: '',
			selectLabel: '',
			selectOptions: [
				{
					label: 'baja',
					value: 'baja'
				},
				{
					label: 'media',
					value: 'media'
				},
				{
					label: 'alta',
					value: 'alta'
				}
			]
		};
	}

	componentDidMount = async () => {
		const { data } = await axios.get(`${USER_AND_JOBS}/${getToken().id}`);
		this.setState({ dataJobs: data.data.Job });
	};

	updateJob = async (e, data) => {
		e.preventDefault();
		try {
			const expirationDate = this.state.expirationDate || data.expirationDate;
			const priority = this.state.selectValue || data.priority;
			const name = this.state.name || data.name;
			const description = this.state.description || data.description;

			if (name && expirationDate && description && priority) {
				const updateMyJob = await axios.post(UPDATE_JOB, {
					id: data.id,
					user: getToken().id,
					name,
					priority,
					expirationDate,
					description
				});

				if (updateMyJob.data.state) {
					this.setState({ dataJobs: updateMyJob.data.data });
					alert('success', 'se modificó correctamente', null);
					return;
				}
				alert(
					'error',
					'error modificando la tarea',
					'no se pudo modificar correctamente la tarea, intente de nuevo mas tarde'
				);
			}
			alert('error', 'campos vacíos', 'los campos [ fecha, titulo, prioridad, descripción] son obligatorios');
		} catch (error) {
			console.log('=======error=======> ', error.response.data);
		}
	};

	clearJob = () => {
		this.setState({
			name: '',
			description: '',
			selectLabel: '',
			selectValue: '',
			expirationDate: null
		});
	};

	FormEditJobs = (data) => {
		return (
			<Form onSubmit={(e) => this.updateJob(e, data)}>
				<Form.Group controlId="input_date_job">
					<Form.Label className="lbl_date_update_jobs">fecha</Form.Label>
					<DatePicker
						onKeyDown={(e) => e.preventDefault()}
						autoComplete="false"
						className="date_update_jobs"
						selected={
							this.state.expirationDate ? (
								new Date(this.state.expirationDate)
							) : (
								new Date(data.expirationDate)
							)
						}
						onChange={(e) => this.setState({ expirationDate: moment(e).format('L') })}
						// maxDate={new Date()}
						dateFormat="dd/MM/yyyy"
					/>
				</Form.Group>

				<Form.Group controlId="input_name_job">
					<Form.Label>Titulo</Form.Label>
					<Form.Control
						type="text"
						defaultValue={this.state.name || data.name}
						maxLength={255}
						onChange={(e) => this.setState({ name: e.target.value })}
					/>
				</Form.Group>

				<Form.Group controlId="input_select_job">
					<Form.Label className="lbl_date_update_jobs">Prioridad</Form.Label>
					<Selection
						placeholder="Seleccionar"
						value={{
							value: this.state.selectValue || data.priority,
							label: this.state.selectLabel || data.priority
						}}
						onChange={(e) => {
							this.setState({ selectValue: e.value, selectLabel: e.label });
						}}
						options={this.state.selectOptions.map((data) => ({
							value: data.value,
							label: data.label
						}))}
					/>
				</Form.Group>

				<Form.Group controlId="input_description_job">
					<Form.Label>Descripción</Form.Label>
					<Form.Control
						as="textarea"
						rows="3"
						defaultValue={this.state.description || data.description}
						maxLength={255}
						onChange={(e) => this.setState({ description: e.target.value })}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Modificar
				</Button>
			</Form>
		);
	};

	deleteJob = async (id) => {
		try {
			const resultDelete = await axios.post(DELETE_JOB, { id, user: getToken().id });
			this.setState({dataJobs:resultDelete.data.data})
		} catch (error) {
			console.log('=======error=======> ', error.response.data);
		}
	};

	PendingJobs = (data, key) => {
		return (
			<Col sm={3} className="cards_jobs" key={key}>
				<Card bg="dark" text="white" style={{ width: '17rem' }}>
					<Card.Header>fecha limite: {moment(data.expirationDate).format('DD/MM/YYYY')}</Card.Header>

					<Card.Body>
						<Card.Title>{data.name}</Card.Title>
						<Card.Text>
							<b>
								<i>Prioridad: {data.priority}</i>
							</b>
						</Card.Text>
						<Card.Text>{data.description}</Card.Text>
					</Card.Body>

					<Card.Footer>
						<WindowModal
							btnOpen={`editar`}
							variant={`secondary`}
							title="Modificación de Tarea"
							btnsend="Modificar"
							openFunction={() => {}}
							closeFunction={this.clearJob}
						>
							{this.FormEditJobs(data)}
						</WindowModal>

						<Button
							variant="danger"
							size="sm"
							className="btn_accion_cards"
							onClick={() => alertDeleteJob(data, this.deleteJob)}
						>
							eliminar
						</Button>
					</Card.Footer>
				</Card>
			</Col>
		);
	};

	render() {
		return (
			<ContextAuth.Consumer>
				{({ authenticated }) => {
					if (authenticated) {
						return (
							<Fragment>
								<Row>
									<Col>
										<h1>Modulo Tareas</h1>
									</Col>
								</Row>
								<Row>
									<Col>
										<WindowModal
											btnOpen={`Crear Tarea`}
											title="Nueva Tarea"
											btnsend="Enviar"
											openFunction={() => {}}
											closeFunction={() => {}}
										/>
									</Col>
								</Row>
								<br />
								<Row>
									{this.state.dataJobs.length > 0 ? (
										this.state.dataJobs.map((data, key) => {
											return this.PendingJobs(data, key);
										})
									) : (
										<h3>No tiene tareas asignadas</h3>
									)}
								</Row>
							</Fragment>
						);
					}

					return <RedirectLogin />;
				}}
			</ContextAuth.Consumer>
		);
	}
}
