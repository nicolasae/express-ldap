const models = require('../database/models');
const { validationResult } = require('express-validator')


//GET ALL NEWS
const newsList = async (req, res) => {

    try {
        let dataNews = await models.New.findAll({
            include: [{ 
                model: models.Category,
                as: 'Categories',
            }],
            raw:true,

          });

        // dataNews.forEach((element, index) => {
        //     let auxDate = new Date((element.createdAt))
        //     const dateCorrectFormat = `${auxDate.getFullYear()}-${auxDate.getMonth()}-${auxDate.getDate()} ${auxDate.getHours()}:${auxDate.getMinutes()}:${auxDate.getSeconds()}`
        //     console.log(auxDate.get)
        //     element.createdAt = dateCorrectFormat
        // })
        console.log(dataNews)

        res.render('admin/newsLIst', { dataNews: dataNews})
        
    
    }catch(error){
        console.log('Ha ocurrido un error: ' + error);
    }
}


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
const createNewAction = async (req, res) => {
    const { title, summary, link,active, activeForPortal, selectCategories} = req.body

    console.log(summary)

    const convertArrayCategories = []

    if( typeof selectCategories == "string") {
        convertArrayCategories[0] = parseInt(selectCategories)
    }
    else if(typeof selectCategories == "object" ) {
        selectCategories.forEach((idCategory, index ) => {
            convertArrayCategories[index] = parseInt(idCategory)
        })
    }
    else {
        convertArrayCategories[0] = 1
    }  
    
    const infoNew = {
        title,
        summary,
        link,
        image: req.file? req.file.filename : 'imagen-noticia-defecto.jpeg',
        active: (active === 'on' ) ? 1 : 0,
        activeForPortal: (activeForPortal === 'on' ) ? 1 : 0,
        idAuthor: 1,
    }

    try {
        // Insert a new
        const newData = await models.New.create({
            title: infoNew.title,
            summary:infoNew.summary,
            link: infoNew.link,
            image: infoNew.image,
            active: infoNew.active,
            activeForPortal: infoNew.activeForPortal,
            idAuthor: infoNew.idAuthor,
        })
        
        convertArrayCategories.forEach(async (item) => {
            const category = await models.Category.findOne({
                where: { id: item },
                attributes: ['id','name'],
                raw:true,
            })
            // Validation of existing category 
            // if(!category) {
            //     return res.status(400)
            // }

            const nc = {
                idCategory: item,
                idNew: newData.id
            }

            const saveNewCategory = await models.New_Category.create(nc)
        })
        
        res.status(200).json({'message': 'Usuario creado con exito'})

    }catch(error){
        console.log('Ha ocurrido un error: ' + error);
    }

}

// DETAIL NEW
const detailNew = async(req, res) => {
    let id = req.params.id;
    try {
        const newData = await models.New.findOne({
            include: [{ 
                model: models.Category,
                as: 'Categories'
            }],
            where:{ id: id },
            raw: true
        })
        // console.log(newData)
        res.render('admin/newDetail.ejs')
    }catch(error){
        console.log('Ha ocurrido un error: ' + error);
    }
}

module.exports = {
    newsList,
    createNew,
    createNewAction,
    detailNew,
}