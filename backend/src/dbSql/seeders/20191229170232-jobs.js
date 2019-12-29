'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Jobs',
			[
				{
					name: 'tarea 1',
          priority: 'baja',
          description:'descripcion tarea 1',
          expirationDate:new Date(),
          user:1,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
					name: 'tarea 2',
          priority: 'media',
          description:'descripcion tarea 2',
          expirationDate:new Date(),
          user:1,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
					name: 'tarea 2',
          priority: 'alta',
          description:'descripcion tarea 2',
          expirationDate:new Date(),
          user:1,
          createdAt:new Date(),
          updatedAt:new Date()
        },
        {
					name: 'tarea 3',
          priority: 'baja',
          description:'descripcion tarea 3',
          expirationDate:new Date(),
          user:1,
          createdAt:new Date(),
          updatedAt:new Date()
				}
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Jobs', null, {});
	}
};
