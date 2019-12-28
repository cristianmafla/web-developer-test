'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Tables',
			[
				{
					fieldString: '1 lorem ipsu',
					fieldNumeric: 100
        },
        {
					fieldString: '2 lorem ipsu',
					fieldNumeric: 200
        },
        {
					fieldString: '3 lorem ipsu',
					fieldNumeric: 300
				}
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Table', null, {});
	}
};
