const models = require('../database/models');
const { validationResult } = require('express-validator');
const { where } = require('sequelize');

//GET ALL NEWS
const newsList = async (req, res) => {

    try {
        let dataNewsActives = await models.New.findAll({
            where:{active:1},
            include: [{ 
                model: models.Category,
                as: 'Categories',
                attributes:['id','name'],
            }],
        });
        let dataNewsInactives = await models.New.findAll({
            where:{active:0},
            include: [{ 
                model: models.Category,
                as: 'Categories',
                attributes:['id','name'],
            }],
        });
        
        res.render('admin/newsList', { dataNewsActives: dataNewsActives, dataNewsInactives: dataNewsInactives})  
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
        newData: '',
    });
}

// CREATE NEW PROCCESS
const createNewAction = async (req, res) => {
    const { title, summary, link,active, activeForPortal, selectCategories} = req.body
    const idAuthor = req.session.infoUserLogged.id

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
        idAuthor,
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

            const nc = {
                idCategory: item,
                idNew: newData.id
            }
            const saveNewCategory = await models.New_Category.create(nc)
        })
        
        res.redirect('/admin/noticias')

    }catch(error){
        console.log('Ha ocurrido un error: ' + error);
    }
}

// UPDATE USER
const editNew = async (req, res) => {
    let id = req.params.id;
    
    try {
        
        const newData = await models.New.findOne({
            where:{ id: id },
            include: [{ 
                model: models.Category,
                as: 'Categories',
                attributes:['id','name'],
                through:{
                    attributes: [],
                }
            }],
        })

        const dataCategories = await models.Category.findAll({
            attributes:['id','name'],
            order: [['id','ASC']],
            raw:true,
        })

        return res.render('admin/createNew',{ 
            infoNew:'', 
            active: 'edit',
            newData: newData,
            dataCategories: dataCategories
        });
        
    }catch(error){  
      console.log('Ha ocurrido un error: ' + error);
    }
};

const editNewAction = async( req, res ) => {
    const id = req.params.id 
    const { title, summary, link,active, activeForPortal, selectCategories} = req.body
    const idAuthor = req.session.infoUserLogged.id

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
        idAuthor,
    }

    try {
        const newData = await models.New.update(infoNew, { where: { id: id } })
        convertArrayCategories.forEach(async (item) => {
            const category = await models.Category.findOne({
                where: { id: item },
                attributes: ['id','name'],
                raw:true,
            })                
        })
            
        res.json({
            'data':convertArrayCategories
        })
  
    }catch(error) {
        console.log('Ha ocurrido un error: ' + error);
  
    }
}


// DETAIL NEW
const detailNew = async(req, res) => {
    let id = req.params.id;
    try {
        const newData = await models.New.findOne({
            where:{ id: id },
            include: [{ 
                model: models.Category,
                as: 'Categories',
                attributes:['id','name'],
                through:{
                    attributes: [],
                }
            }],
        })
        res.render('admin/newDetail.ejs',{newData: newData, categories:newData.Categories})
    }catch(error){
        console.log('Ha ocurrido un error: ' + error);
    }
}

// Delete new by Id
const deleteNew = async (req, res) => {
    let id = req.params.id;
  
    try {
      let newData = await models.New.destroy({ where: { id: id } });
      return res.redirect('/admin/noticias')
    }
    catch(error){
      console.log('Ha ocurrido un error: ' + error);
    }
};

const toggleStatePortal = async( req, res ) => {
    const { id } = req.params;
    try {
        let newData = await models.New.findByPk(id);
        let state = newData.activeForPortal
        console.log(state)
        const updateUser = await models.New.update({activeForPortal: !state }, { where: { id: id } });
        
        res.redirect('/admin/noticias')
  
    }catch(error){
      console.log('Ha ocurrido un error: ' + error);
    }
}

const toggleState = async( req, res ) => {
    const { id } = req.params;
    try {
        let newData = await models.New.findByPk(id);
        let state = newData.active
        console.log(state)
        const updateUser = await models.New.update({active: !state }, { where: { id: id } });
        
        res.redirect('/admin/noticias')
  
    }catch(error){
      console.log('Ha ocurrido un error: ' + error);
    }
}

module.exports = {
    newsList,
    createNew,
    createNewAction,
    editNew,
    editNewAction,
    detailNew,
    deleteNew,
    toggleStatePortal,
    toggleState
}