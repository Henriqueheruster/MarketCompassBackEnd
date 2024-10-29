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

produto.belongsToMany(mercado,{through:'produtoMercado'})

produto.sync({force:true}).then(()=>{
    console.log("Tabela de ProdutosMercados criada!")
})
mercado.sync({force:true}).then(()=>{
    console.log("Tabela de ProdutosMercados criada!")
})
//module.exports = ProdutosMercado