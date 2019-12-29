import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models';

dotenv.config({ path: '.env' });

//one user
export const user = async (req, res) => {
	try {
		const { id } = req.params;

		if (id) {
			const user = await db.User.findOne({
				where: { id },
				include: [
					{
						model: db.Job,
						as: 'Job'
					}
				]
			});

			if (user) {
				res.status(200).send({ state: true, data: user });
			} else {
				res.status(200).send({ state: false, data: `No existe un usuario con id: ${id}` });
			}

			return;
		}

		res.status(400).send({ state: false, data: `El dato id de es requerido` });
	} catch (error) {
		console.log('=======error=======> ', error);

		res.status(500).send({ state: false, data: error });
	}
};

//all users
export const users = async (req, res) => {
	try {
		const totalUsers = await db.User.findAll({});
		res.status(200).send(totalUsers);
	} catch (error) {
		res.status(500).send(error);
	}
};

//create
export const create = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (name && email && password) {
			const newUser = await db.User.create({
				name,
				email,
				password
			});

			if (newUser) {
				res.status(200).send({ state: true, data: newUser });
			} else {
				res
					.status(200)
					.send({ state: false, data: `no se pudo crear el usuario,vuelva a intentarlo mas tarde` });
			}
			return;
		}

		res.status(400).send({ state: false, data: `los datos [name, email, password ] son requeridos` });
	} catch (error) {
		res.status(500).send({ state: false, data: error });
	}
};

//login
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (email && password) {
			const myUser = await db.User.findOne({ where: { email, password } });

			if (myUser) {

				const objToken = {
					id: myUser.dataValues.id,
					name: myUser.dataValues.name,
					email: myUser.dataValues.email
				};

				res.status(200).send({
					state: true,
					data: jwt.sign(objToken, process.env.SECRET_KEY_TOKEN, { expiresIn: '7d' })
        });
        
			} else {
				res
					.status(400)
					.send({ state: false, data: `no se pudo loguear,verfique sus datos e intente nuevamente` });
			}

			return;
		}

		res.status(400).send({ state: false, data: `los datos [ email, password ] son obligatorios` });
	} catch (error) {
		console.log('=======error=======> ', error);
		res.status(500).send({ state: false, data: error });
	}
};
