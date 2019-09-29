"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('users', [{
			email: '123@gmail.com',
			passw: '123',
		},{
			email: '345@gmail.com',
			passw: '123',
		},{
			email: '12356@gmail.com',
			passw: '12345',
		}])
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('users',null, {})
	} 
}