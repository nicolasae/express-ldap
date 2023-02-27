// Database information
module.exports = {
    HOST:'localhost',
    USER:'root',
    PASSWORD:'',
    DB: 'prueba_backend',
    dialect:'mysql',

    // recommended settings by documentation
    pool:{
        max:5, 
        min:0,
        acquire: 30000,
        idle: 10000
    }
}