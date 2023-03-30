'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', 
    [
      { 
        id: 1,
        name: 'Sin categoria',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: 2,
        name: 'Institucional',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id: 3,
        name: 'Académico',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
