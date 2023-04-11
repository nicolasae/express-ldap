'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('NewCategories', 
    [
      {
        id:1,
        idNew:1,
        idCategory:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:2,
        idNew:2,
        idCategory:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:3,
        idNew:3,
        idCategory:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:4,
        idNew:4,
        idCategory:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('NewCategories', null, {});
  }
};
