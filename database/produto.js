const sequelize = require('sequelize')
const connection = require('./database')

const produtos = connection.define('produto',{       
    nome:{
        type: sequelize.STRING,
        allowNull: false
        //primaryKey: true,
        //autoIncrement: true
    },
    img:{
        type:sequelize.STRING,
        allowNull: true
    }
})
  
produtos.sync({force:false}).then(()=>{
    console.log("Tabela de produtos criada!")
})

module.exports = produtos