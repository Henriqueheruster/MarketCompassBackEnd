const sequelize = require('sequelize')
const connection = require('./database')
const produtos = require('./produto')
const mercado = require('./mercados')

const ProdutosMercado = connection.define('ProdutosMercado',{}, {timestamps: false}) 

produtos.belongsToMany(mercado,{through:ProdutosMercado})
mercado.belongsToMany(produtos,{through:ProdutosMercado})



module.exports = ProdutosMercado