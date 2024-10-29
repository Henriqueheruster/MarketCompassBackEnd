const sequelize = require('sequelize')
const connection = require('./database')
const produto = require('./produto')
const mercado = require('./mercados')

/* const ProdutosMercado = connection.define('ProdutosMercado',{
    IDMercado:{
        type:sequelize.INTEGER,
        allowNull:true,        
    },    
    IDProduto:{
        type:sequelize.INTEGER,
        allowNull: true
        //primaryKey: true,
        //autoIncrement: true
    }  
}) */

produto.hasMany(ProdutosMercado)
mercado.hasMany(ProdutosMercado)

ProdutosMercado.sync({force:true}).then(()=>{
    console.log("Tabela de ProdutosMercados criada!")
})

module.exports = ProdutosMercado