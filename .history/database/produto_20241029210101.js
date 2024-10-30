const sequelize = require('sequelize')
const connection = require('./database')

const produtos = connection.define('produto',{
    IDProduto:{
        type:sequelize.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },    
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
  
produtos.sync({force:true}).then(()=>{
    console.log("Tabela de produtos criada!")
})

module.exports = produtos