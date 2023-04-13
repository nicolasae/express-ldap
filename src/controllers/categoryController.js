const models = require('../database/models');
const {validationResult } = require('express-validator')

//GET ALL NEWS
const categoriesList = async (req, res) => {
    try {
        let dataCategories = await models.Category.findAll({});               
        res.render('admin/categoriesList', { dataCategories: dataCategories})  
    }catch(error){
        console.log('Ha ocurrido un error: ' + error);
    }
}

// DETAIL CATEGORY
const detailCategory = async(req, res) => {
    let id = req.params.id;
    try {
        const categoryData = await models.Category.findOne({
            where:{ id: id },
        })

        res.render('admin/categoryDetail.ejs',{categoryData: categoryData, })
    }catch(error){
        console.log('Ha ocurrido un error: ' + error);
    }
}

// CREATE USER CATEGORY 
const newCategory = async(req, res) => {
    return res.render('admin/newCategory',{ infoUser:'',active: 'create'});
}

// CREATE USER PROCCESS
const newCategoryAction = async (req, res) => {

    try {
        const { name } = req.body
        const errors = validationResult(req);
        
        let infoCategory = {
            name,
        };  
        
        console.log(errors)
        if (!errors.isEmpty()) {
            res.render('admin/newCategory',{ infoCategory:'', active: 'create', mensaje: errors.errors, ok:false })
        }else {
            const [category, created] = await models.Category.findOrCreate({
                where: { name: name },
                defaults: infoCategory
            });

            if(created){
                res.render('admin/newCategory',{ infoCategory:'', active: 'create', mensaje: 'Categoria creado con éxito', ok:true })
            }else {
                res.render('admin/newCategory',{ infoCategory:'',active: 'create', mensaje: 'Nombre de categoria no disponible para creación de usuario', ok:false })
            }
        }
    }
    catch(error){
        console.log('Ha ocurrido un error: ' + error);
    }
}

// UPDATE CATEGORY
const editCategory = async (req, res) => {
    
    try {
        let id = req.params.id;
        const category = await models.Category.findByPk( id, {raw:true});
        res.render('admin/newCategory', { infoCategory: category, mensaje: 'Categoria creada con exito', ok:true});
  
    }catch(error){  
        console.log('Ha ocurrido un error: ' + error);
    }
  };
  
const editCategoryAction = async( req, res ) => {
    
    try {
        let id = req.params.id 
        const { name } = req.body;
        const errors = validationResult(req);

        let infoCategory = {
            id: parseInt(id),
            name,
        }
        
        if (!errors.isEmpty()) {
            res.render('admin/newCategory',{ infoCategory:infoCategory, mensaje: errors.errors, ok:false,active:'edit' })
        }else {
            const category = await models.Category.update({ name: name}, 
                { where: 
                    { id: id }
                }
            );
            res.render('admin/newCategory', {infoCategory: infoCategory, mensaje:'Categoria actualizada correctamente',ok:true, active:'edit'} );
        }
  
    }catch(error) {
      console.log('Ha ocurrido un error: ' + error); 
    }
}
  
module.exports = {
    categoriesList,
    detailCategory,
    newCategory,
    newCategoryAction,
    editCategory,
    editCategoryAction
}