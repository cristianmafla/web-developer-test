'use strict';
module.exports = (sequelize, DataTypes) => {
	const Job = sequelize.define(
		'Job',
		{
			name: DataTypes.STRING,
			priority: DataTypes.STRING,
			description:DataTypes.STRING,
			expirationDate: DataTypes.DATE,
			user: DataTypes.INTEGER
		},
		{}
	);
	Job.associate = function(models) {
		Job.belongsTo(models.User, { as: 'User', foreignKey: 'user' });
	};
	return Job;
};
