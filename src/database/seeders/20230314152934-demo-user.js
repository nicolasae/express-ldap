'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', 
    [
      { 
        id:1,
        name: 'Nicolas Aguirre Espinosa',
        email: 'nicolas.aguirre@utp.edu.co',
        active: true,
        idRole: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:2,
        name: 'Daniel Duque',
        email: 'daanduque@utp.edu.co',
        active: true,
        idRole: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:3,
        name: 'Cristian Camilo Manzano',
        email: 'ccmanzano@utp.edu.co',
        active: true,
        idRole: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:4,
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
