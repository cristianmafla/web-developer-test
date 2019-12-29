'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					id:1,
					name: 'cristian  mafla',
					email: 'cristiancaxi@gmail.com',
					password:'123456',
					createdAt:new Date(),
					updatedAt:new Date()
        },
				{
					id:2,
					name: 'usuario uno',
					email: 'usuarios@email.com',
					password:'123456',
					createdAt:new Date(),
					updatedAt:new Date()
				},
				{
					id:3,
					name: 'usuario 2',
					email: 'usuario2@email.com',
					password:'123456',
					createdAt:new Date(),
					updatedAt:new Date()
        },
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};
