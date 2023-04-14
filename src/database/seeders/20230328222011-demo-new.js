'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('News', 
    [
      {
        id:1,
        title:'Resolución No. 2461 Convoca Elecciones representantes Consejo Superior, Consejo Académico y Comités Institucionales',
        summary:'La Secretaría General informa que mediante Resolución de Rectoría No. 2461 del 30 de marzo de 2023, se convoca la elección de representantes ante el Consejo Superior, COnsejo Académico y Comités Institucionales, así:',
        link:'https://comunicaciones.utp.edu.co/noticias/52307/resolucion-no-2461-convoca-elecciones-representantes-consejo-superior-consejo-academico-y-comites-institucionales',
        image:'logo-secretaria-general.jpg',
        active:1,
        activeForPortal:1,
        idAuthor:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:2,
        title:'Estudio de Clima Organizacional al interior de la UTP arroja resultados positivos',
        summary:'Gestión del Talento Humano reveló los resultados del último estudio de clima organizacional de la Institución y más del 90% de los encuestados aseguraron estar felices de hacer parte de la Universidad.',
        link:'https://comunicaciones.utp.edu.co/noticias/52256/estudio-de-clima-organizacional-al-interior-de-la-utp-arroja-resultados-positivos',
        image:'FOTOS-UTP.png',
        active:1,
        activeForPortal:1,
        idAuthor:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:3,
        title:'Programa de acompañamiento académico ',
        summary:'La Vicerrectoría Académica está comprometida con el desarrollo académico de los estudiantes y ha dado inicio al programa de acompañamiento en matemáticas “PAMA” y al programa de acompañamiento en lectura, escritura y oralidad PALE.',
        link:'https://comunicaciones.utp.edu.co/noticias/52305/programa-de-acompanamiento-academico',
        image:'Disen-o-sin-ti-tulo-60.png',
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
        link:'https://crie.utp.edu.co/yo-amo-la-utp/',
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
