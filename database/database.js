const Sequelize = require('sequelize')

const connection = new Sequelize('marketcompass','root','HEmafae88562989#NuelBD',{
    host: 'server-database',
    dialect: 'mysql'
})

module.exports = connection
