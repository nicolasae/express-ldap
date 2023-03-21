const models = require('../database/models');

const index = async (req, res) => {
    try {
        return res.render('index')
    }
    catch(error){
        console.log(error)
        res.status(500).json({ "message":`Problema con el servidor`})
    }
}

module.exports = {
    index,
}