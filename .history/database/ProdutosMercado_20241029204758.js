const sequelize = require('sequelize')
const connection = require('./database')
const produto = require('./produto')
const mercado = require('./mercados')

const ProdutosMercado = connection.define('ProdutosMercado',{}, {timestamps: false}) 

produto.belongsToMany(mercado,{through:ProdutosMercado})

module.exports = ProdutosMercado