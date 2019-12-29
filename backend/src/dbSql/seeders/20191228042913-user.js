'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					name: 'cristian  mafla',
					email: 'cristiancaxi@gmail.com',
					password:'123456'
        },
				{
					name: '2 lorem ipsu',
					email: '2lorem@ipsu.co',
					password:'123456'
				},
				{
					name: '3 lorem ipsu',
					email: '3lorem@ipsu.co',
					password:'123456'
        },
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Table', null, {});
	}
};
