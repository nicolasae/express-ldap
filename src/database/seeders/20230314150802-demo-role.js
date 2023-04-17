'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', 
    [
      { 
        id: 1,
        name: 'Super Administrador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Administrador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});

  }
};
