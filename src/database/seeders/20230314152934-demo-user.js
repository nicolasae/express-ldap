'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', 
    [
      {
        id:1,
        name: 'Super administrador',
        email: 'liNgfreN@utp.edu.co',
        active: true,
        idRole: 1,
        password:'$2a$10$znXHw2Z1bGqaL1s.0X5BQefftwh83rSbkBdyLDxNPHFR0fUNWJSdy',
        identification: 1111111,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:2,
        name: 'Administrador',
        email: 'iNtoPTiv@utp.edu.co',
        active: true,
        idRole: 2,
        password:'$2a$10$ovn85HbTde5ox7p7IZpbZedNwXuV/Hz5dca9b8PAdUtts0BjQqcE2',
        identification: 2222222,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        id:3,
        name: 'Nicolas Aguirre Espinosa',
        email: 'nicolas.aguirre@utp.edu.co',
        active: true,
        idRole: 1,
        password:'',
        // password:'$2a$10$vaiae3vn6yUwQDKBF8Q8wOeb.r21.HNQzqQVqHkZ7idyd.ynOzXzW',
        identification: 1010124299,
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id:4,
        name: 'Cristian Camilo Manzano',
        email: 'ccmanzano@utp.edu.co',
        active: false,
        idRole: 2,
        password:'',
        // password:'$2a$10$pktWkqRY1F89M6hN0.bq1OVUTMQm4PBjxlc8S5wHesPiiyA0c7r1S',
        identification: 1088324977,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:5,
        name: 'Cristian Camilo Holguin',
        email: 'cris.635@utp.edu.co',
        active: false,
        idRole: 2,
        password:'',
        // password:'$2a$10$wA0JiLDHQBdiVfbtC2L8hezRqeY0SvHyVgu4pIiindcleHXI8mieK',
        identification: 1088325301,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
