const sequelize = require('sequelize')
const connection = require('./database')

const mercados = connection.define('mercados',{
    IDMercado:{
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

mercados.sync({force:false}).then(()=>{
    console.log("Tabela de mercados criada!")
})

module.exports = mercados