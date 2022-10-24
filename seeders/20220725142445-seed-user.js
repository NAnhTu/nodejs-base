'use strict';
const passwordHelper = require('../helper/hash-password')
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          code: 'admin01',
          name: 'admin',
          email: 'admin@gmail.com',
          password: passwordHelper.generate('Admin123'),
          role: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ], {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {})
  }
};
