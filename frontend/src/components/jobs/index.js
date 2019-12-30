import React, { Component, Fragment } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Selection from 'react-select';
import { ContextAuth } from '../../context/auth';
import { USER_AND_JOBS, UPDATE_JOB, DELETE_JOB, CREATE_JOB } from '../../utils/variables';
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
			],
			newExpirationDate: null,
			newName: '',
			newSelect: '',
			newDescription: '',
			dataExpiredJobs:[],
			dataNextExpireJobs:[]
		};
	}

	componentDidMount = async () => {
		try {
			const { data } = await axios.get(`${USER_AND_JOBS}/${getToken().id}`);
			this.setState({ 
				dataJobs: data.data.Job,
				dataJobsCopy:data.data.Job,
				dataExpiredJobs:this.expiredJobs(data.data.Job),
				dataNextExpireJobs:this.nextExpireJobs(data.data.Job)
			});
		} catch (error) {
			console.log('=======error=======> ',error)
			if (typeof(error.response) !== 'undefined' && !error.response.data.state) {
				alert('error', 'error consultado las tareas del usuario', error.response.data.data);
				return;
			}
			alert('error','error consultado las tareas del usuario','no se pudo consultar las tareas del usuario, intente de nuevo mas tarde')
		}
	
	};

	expiredJobs = Job => {
		return Job.filter(data => {
			const timeCurrent = Date.parse(moment(new Date()).format());
			const timeExpiredJob = Date.parse(moment(data.expirationDate).format());
			if(timeCurrent >= timeExpiredJob) return data;
		});
	}

	nextExpireJobs = Job => {
		return Job.filter(data => {
			const timeCurrent = moment(new Date());
			const timeExpiredJob = moment(data.expirationDate);
			const difference = timeExpiredJob.diff(timeCurrent,'hours')
			console.log('=======difference=======> ',data.id,difference)
			
			if(difference > 1 && difference < 48) return data;
		});
	}

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
					this.setState({ 
						dataJobs: updateMyJob.data.data,
						dataJobsCopy:updateMyJob.data.data,
						dataExpiredJobs:this.expiredJobs(updateMyJob.data.data),
						dataNextExpireJobs:this.nextExpireJobs(updateMyJob.data.data)
				 });
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
			if (typeof(error.response) !== 'undefined' && !error.response.data.state) {
				alert('error', 'error modificando la tarea', error.response.data.data);
				return;
			}
			alert('error','error modificando la tarea','no se pudo modificar la tarea, intente de nuevo mas tarde')
		}
	};

	createJob = async (e) => {
		e.preventDefault();
		try {
			const name = this.state.newName;
			const priority = this.state.newSelect;
			const user = getToken().id;
			const description = this.state.newDescription;
			const expirationDate = this.state.newExpirationDate || new Date();

			if (name && priority && user && description && expirationDate) {
				const newJob = await axios.post(CREATE_JOB, {
					name,
					priority,
					user,
					description,
					expirationDate
				});

				if (newJob.data.state) {
					this.setState({ 
						dataJobs: newJob.data.data,
						dataJobsCopy:newJob.data.data,
						dataExpiredJobs:this.expiredJobs(newJob.data.data),
						dataNextExpireJobs:this.nextExpireJobs(newJob.data.data)
					});
					alert('success', 'se ha creado una nueva tarea', 'se creó correctamente');
				}
				return;
			}
			alert('warning', 'campos vacíos', 'los campos [ fecha, titulo, prioridad, descripción ] son obligatorios');
		} catch (error) {
			console.log('=======error=======> ', error);
			if (typeof(error.response) !== 'undefined' && !error.response.data.state) {
				alert('error', 'error creando la tarea', error.response.data.data);
				return;
			}
			alert('error', 'error creando la tarea', 'no se creo la tarea, vuelva a intentarlo mas tarde');
		}
	};

	clearJobCreate = () => {
		this.setState({
			newName: '',
			newDescription: '',
			newSelect: '',
			newExpirationDate: null
		});
	};

	clearJobEdit = () => {
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

	FormCreateJobs = () => {
		return (
			<Form onSubmit={(e) => this.createJob(e)}>
				<Form.Group controlId="input_date_job">
					<Form.Label className="lbl_date_update_jobs">fecha</Form.Label>
					<DatePicker
						onKeyDown={(e) => e.preventDefault()}
						autoComplete="false"
						className="date_update_jobs"
						selected={this.state.newExpirationDate ? new Date(this.state.newExpirationDate) : new Date()}
						onChange={(e) => this.setState({ newExpirationDate: moment(e).format('L') })}
						dateFormat="dd/MM/yyyy"
					/>
				</Form.Group>

				<Form.Group controlId="input_name_job">
					<Form.Label>Titulo</Form.Label>
					<Form.Control
						type="text"
						autoComplete="off"
						defaultValue={this.state.newName}
						maxLength={255}
						onChange={(e) => this.setState({ newName: e.target.value })}
					/>
				</Form.Group>

				<Form.Group controlId="input_select_job">
					<Form.Label className="lbl_date_update_jobs">Prioridad</Form.Label>
					<Selection
						placeholder="Seleccionar"
						value={{
							value: this.state.newSelect,
							label: this.state.newSelect || 'Seleccionar'
						}}
						onChange={(e) => this.setState({ newSelect: e.value })}
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
						defaultValue={this.state.newDescription}
						maxLength={255}
						onChange={(e) => this.setState({ newDescription: e.target.value })}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Crear
				</Button>
			</Form>
		);
	};

	deleteJob = async (id) => {
		try {

			const resultDelete = await axios.post(DELETE_JOB, { id, user: getToken().id });
			console.log('=======resultDelete=======> ',resultDelete)
			
			if(resultDelete.data.state){

				this.setState({ 
					dataJobs: resultDelete.data.data,
					dataJobsCopy:resultDelete.data.data,
					dataExpiredJobs:this.expiredJobs(resultDelete.data.data),
					dataNextExpireJobs:this.nextExpireJobs(resultDelete.data.data)
				});
				return true;
			}
			return false

		} catch (error) {
			throw error;
		}
	};

	PendingJobs = (data, key) => {
		const type = (data) => {
			switch (data) {
				case 'baja':
					return 'dark';
				case 'media':
					return 'warning';
				case 'alta':
					return 'danger';
				default:
					return 'dark';
			}
		};

		return (
			<Col sm={3} className="cards_jobs" key={key}>
				<Card bg={type(data.priority)} text="white" style={{ width: '17rem' }}>
					<Card.Header>fecha limite: {moment(data.expirationDate).format('DD/MM/YYYY')}</Card.Header>

					<Card.Body>
						<Card.Text>
							<b>Id: {data.id}</b>
						</Card.Text>
						<Card.Title>Titulo: {data.name}</Card.Title>
						<Card.Text>
							<b>
								<i>Prioridad: {data.priority}</i>
							</b>
						</Card.Text>
						<Card.Text>Descripción: {data.description}</Card.Text>
					</Card.Body>

					<Card.Footer>
						<WindowModal
							btnOpen={`editar`}
							variant={`secondary`}
							title="Modificación de Tarea"
							btnsend="Modificar"
							openFunction={() => {}}
							closeFunction={this.clearJobEdit}
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
											closeFunction={this.clearJobCreate}
										>
											{this.FormCreateJobs()}
										</WindowModal>

										<Button 
											size="sm"
											type="button"
											variant="outline-dark"
											style={{marginRight:5}}
											onClick={() => this.setState({dataJobs:this.state.dataJobsCopy})}
										>
											Todas {this.state.dataJobs.length}
										</Button>

										<Button 
											size="sm"
											type="button"
											variant="outline-danger"
											style={{marginRight:5}}
											onClick={() => this.setState({dataJobs:this.state.dataExpiredJobs})}
										>
											Vencidas {this.state.dataExpiredJobs.length}
										</Button>

										<Button 
											size="sm"
											type="button"
											variant="outline-warning"
											style={{marginRight:5}}
											onClick={() => this.setState({dataJobs:this.state.dataNextExpireJobs})}
										>
											Proximas a vencer {this.state.dataNextExpireJobs.length}
										</Button>

									</Col>
								</Row>
								<br />
								<Row>
									{this.state.dataJobs.length > 0 ? (
										this.state.dataJobs.map((data, key) => this.PendingJobs(data, key))
									) : (
										<h3>No tiene tareas</h3>
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
