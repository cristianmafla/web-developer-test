import db from '../models';

//findOne job
export const job = async (req, res) => {
	try {
		const { id } = req.params;

		if (id) {
			const myJob = await db.Job.findOne({
				where: { id }
			});

			if (myJob) {
				res.status(200).send({ state: true, data: myJob });
			} else {
				res.status(200).send({ state: false, data: `no existe una tarea con id: ${id}` });
			}
			return;
		}

		res.status(400).send({ state: false, data: `El dato id es requerido` });
	} catch (error) {
		console.log('=======error=======> ', error);
		res.status(500).send(error);
	}
};

//findAll job
export const jobs = async (req, res) => {
	try {
		const myJobs = await db.Job.findAll({});

		if (myJobs.length > 0) {
			res.status(200).send({ state: true, data: myJobs });
		} else {
			res.status(200).send({ state: false, data: `no existe tareas actualmente` });
		}
	} catch (error) {
		res.status(500).send(error);
	}
};

//create job
export const create = async (req, res) => {
	try {
		const { name, priority, expirationDate, description, user } = req.body;

		if (name && priority && description && expirationDate && user) {
			const oneUser = await db.User.findOne({ where: { id: user } });

			if (oneUser) {
				const newJob = await db.Job.create({
					name,
					priority,
					description,
					user,
					expirationDate
				});

				if (newJob) {
					const totalMyJobs = await db.Job.findAll({
						where: { user }
					});

					res.status(200).send({ state: true, data: totalMyJobs });
				} else {
					res
						.status(200)
						.send({ state: false, data: `no se pudo crear la tarea,vuelva a intentarlo mas tarde` });
				}
				return;
			} else {
				res
					.status(400)
					.send({ state: false, data: `no existe un usuario con id: ${user}, para asignarle esta tarea` });
				return;
			}
		}

		res
			.status(400)
			.send({
				state: false,
				data: `los campos [ name, priority, description, user, expirationDate ] son requeridos`
			});
	} catch (error) {
		console.log('=======error=======> ', error);
		res.status(500).send({ state: false, data: error });
	}
};

//update job
export const update = async (req, res) => {
	try {

		const { id, user, name, priority, description, expirationDate } = req.body;

		if (id && user && name && priority && description && expirationDate) {
			const existJob = await db.Job.findOne({ where: { id } });

			if (existJob) {
				const updateJob = await db.Job.update(
					{
						name,
						priority,
						description,
						expirationDate
					},
					{
						where: { id }
					}
				);

				if (updateJob[0]) {
					const myJobs = await db.Job.findAll({ where: { user } });
					res.status(200).send({ state: true, data: myJobs });
				} else {
					res.status(400).send({
						state: false,
						data: `no se pudo modificar la tarea con id: ${id}, vuelva a intentarlo mas tarde`
					});
				}
				return;
			} else {
				res.status(400).send({ state: false, data: `no existe una tarea con id: ${id}` });
				return;
			}
		}

		res
			.status(400)
			.send({
				status: false,
				data: `los datos [ id, user, name, priority,description, expirationDate ] son requeridos`
			});
	} catch (error) {
		console.log('=======error=======> ', error);
		res.status(500).send({ state: false, data: error });
	}
};

//delete
export const deleteJob = async (req, res) => {
	try {
		const { id, user } = req.body;

		if (id && user) {
			const existJob = await db.Job.findOne({ where: { id } });

			if (existJob) {
				
				const deleteJob = await db.Job.destroy({ where: { id } });

				if (deleteJob) {
					const myJobs = await db.Job.findAll({ where: { user } });
					res.status(200).send({ state: true, data: myJobs });
				} else {
					res.status(400).send({ state: false, data: `no se pudo eliminar la tarea con id: ${id}` });
				}
				return;
			}

			res.status(400).send({ state: false, data: `no existe una tarea con id: ${id}` });
			return;
		}

		res.status(400).send({ state: false, data: `los datos [ id, user ] son requediros` });
	} catch (error) {
		res.status(500).send({ state: false, data: error });
	}
};
