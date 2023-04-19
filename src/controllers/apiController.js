const models = require('../database/models');
const baseURL = 'https://media2.utp.edu.co/'

// FORMAT DATE 
const formatDate = (fecha) => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return `${year}-${month}-${day}`;
}

// GET ALL NEWS 
const getAllNews = async ( req,res ) => {
    try {

        let dataNews = await models.New.findAll({
            attributes: ['id','title','summary','image','createdAt', 'updatedAt'],
            raw:true
        })         
        
        dataNews.forEach(item => {                        
            item.image = `${baseURL}${item.image}`
            item.formatCreateAt = formatDate(item.createdAt)
            item.formatUpdatedAt = formatDate(item.updatedAt)
        });

        res.json(dataNews)

    }catch(error){
        console.log('Ha ocurrido un error: ' + error);
    }
}

// GET NEW BY ID
const getInfoNewById = async( req, res ) => {
    try {
        
        const idLocal = req.params.id;
        let dataInfoNew = await models.New.findOne({
            where: { id: idLocal },
            raw:true
        })

        dataInfoNew.image = `${baseURL}${dataInfoNew.image}`
        dataInfoNew.formatCreateAt = formatDate(dataInfoNew.createdAt)
        dataInfoNew.formatUpdatedAt = formatDate(dataInfoNew.updatedAt)
        
        res.json(dataInfoNew)

    }catch(error){
        console.log('Ha ocurrido un error: ' + error);
    }
}

// GET ALL NEWS 
const getAllCategories = async ( req,res ) => {
    try {

        let dataCategories = await models.Category.findAll({
            attributes: ['id','name','createdAt', 'updatedAt'],
            raw:true
        })

        dataCategories.forEach(item => {                        
            item.formatCreateAt = formatDate(item.createdAt)
            item.formatUpdatedAt = formatDate(item.updatedAt)
        });

        res.json(dataCategories)

    }catch(error){
        console.log('Ha ocurrido un error: ' + error);
    }
}

module.exports = {
    getAllNews,
    getInfoNewById,
    getAllCategories,
}