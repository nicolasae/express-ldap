'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', 
    [
      { 
        name: 'Nicolas Aguirre Espinosa',
        email: 'nicolas.aguirre@utp.edu.co',
        active: true,
        idRole: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Daniel Duque',
        email: 'daanduque@utp.edu.co',
        active: true,
        idRole: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cristian Camilo Manzano',
        email: 'ccmanzano@utp.edu.co',
        active: true,
        idRole: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cristian Camilo Holguin',
        email: 'cris.635@utp.edu.co',
        active: true,
        idRole: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
