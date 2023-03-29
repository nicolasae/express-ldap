const models = require('../database/models');
const { validationResult } = require('express-validator')


//GET ALL NEWS
// const newsList = async (req, res) => {

//     // const queryObject = req.query
//     // const filters = {}

//     // for (const [key, value] of Object.entries(queryObject)) {
//     //     filters[key]= parseInt(value)
//     // }
//     // console.log(filters)

//     try {
//         let dataNews = await models.New.findAll({
//             include: [{ 
//                 model: models.Category,
//                 as: 'Categories'
//             }],
//             // where: { 
//             //     idAuthor:filters.idAuthor,
//             //     active:filters.active,
//             //     activeForPortal:filters.activeForPortal
//             // },
//           });
      
//         res.status(200).json({dataNews})
    
//     }catch(error){
//         console.log('Ha ocurrido un error: ' + error);
//     }
// }


// CREATE NEW
const createNew = async( req, res ) => {

    const dataCategories = await models.Category.findAll({
        attributes:['id','name'],
        order: [['id','ASC']],
        raw:true,
    })
    return res.render('admin/createNew',{ 
        infoNew:'', 
        active: 'create',
        dataCategories: dataCategories,
    });
}

// CREATE NEW PROCCESS
// const createNewAction = async (req, res) => {
//     const { title, summary, link, image, active, activeForPortal, idAuthor} = req.body
    
//     try {
//         const newData = await models.New.create({
//             title: title,
//             summary:summary,
//             link: link,
//             image: image,
//             active: active,
//             activeForPortal: activeForPortal,
//             idAuthor: idAuthor,
//             Categories: [
//                 { name: 'Educación' },
//                 { name: 'Egresados' }
//             ]
//         }, 
//         {
//             include: [{ 
//                 model: models.Category,
//                 as: 'Categories'
//             }]
//         }
//         )

        
//     }catch(error){
//         console.log('Ha ocurrido un error: ' + error);
//     }

// }

module.exports = {
    // newsList,
    createNew,
    // createNewAction,
}