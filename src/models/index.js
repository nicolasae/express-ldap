const dbConfig = require('../config/config.js')

const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
)

// Authentication
sequelize.authenticate()
.then(() => {
    console.log('connected')
})
.catch( err => {
    console.log('Error',err)
})

const db = { }

// Constructor
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel.js')(sequelize, DataTypes)

// if force is 2 everytime that we run app we lose our data
db.sequelize.sync({ force: false})
.then(() => {
    console.log('yes re-sync done!')
})

module.exports = db
