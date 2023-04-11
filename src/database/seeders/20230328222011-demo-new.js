'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('News', 
    [
      {
        id:1,
        title:'Candidatos inscritos para elección Representante de las Directivas Académicas ante el CSU ',
        summary:'Informe candidatos inscritos para la elección de un Representante de las Directivas Académicas ante el Consejo Superior Universitario, convocada mediante Resolución no. 1872 del 27 de febrero y dicionada mediante Resolución no. 1917 del 07 de marzo de 2023',
        link:'http://localhost:8080/admin/1/noticia',
        image:'logo-secretaria-general.jpg',
        active:1,
        activeForPortal:1,
        idAuthor:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:2,
        title:'Convocatoria Docente No. 1 de 2023',
        summary:'La Universidad Tecnológica de Pereira se permite convocar a la comunidad a concurso abierto de méritos para la provisión definitiva de ocho (8) plazas de docencia vacantes, que hacen parte de la planta global del personal docente de la institución mediante Convocatoria No. 1 de 2023.La información relacionada con el concurso, puede ser consultada en el siguiente enlace: https://www.utp.edu.co/contratacion/concurso-docente',
        link:'http://localhost:8080/admin/2/noticia',
        image:'concurso-2020-febrero.jpg',
        active:1,
        activeForPortal:1,
        idAuthor:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:3,
        title:'Conoce la plataforma interactiva del ecosistema de alimentos',
        summary:'La Vicerrectoría de Responsabilidad Social y Bienestar Universitario da a conocer la plataforma interactiva del ecosistema de alimentos, con el fin de mantener informada a toda la comunidad alrededor de todos los componentes y actores que convergen en el ecosistema.',
        link:'http://localhost:8080/admin/3/noticia',
        image:'plataforma-ecosistema-de-alimentos.jpg',
        active:0,
        activeForPortal:1,
        idAuthor:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:4,
        title:'Yo amo la UTP',
        summary:'Yo amo la UTP es el nuevo símbolo Institucional ubicado en el Campus, que representa los valores de la Universidad y refleja el sentido de pertenencia de la comunidad. Los invitamos a conocerlo, se encuentra ubicado en la entrada del Galpón.',
        link:'http://localhost:8080/admin/4/noticia',
        image:'imagen-noticia-defecto.jpeg',
        active:0,
        activeForPortal:1,
        idAuthor:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('News', null, {});
  }
};
