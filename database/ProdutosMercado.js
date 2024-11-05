const sequelize = require('sequelize')
const connection = require('./database')
const produtos = require('./produto')
const mercado = require('./mercados')

const ProdutosMercado = connection.define('ProdutosMercado',{    
    produtoId:{
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references:{
            model: produtos,
            key: 'id'
        }
    },
    mercadoId:{
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references:{
            model: mercado,
            key: 'id'
        }
    }

}, {timestamps: false}) 


produtos.belongsToMany(mercado,{through:ProdutosMercado, foreignKey: 'produtoId', otherKey: 'mercadoId'})
mercado.belongsToMany(produtos,{through:ProdutosMercado, foreignKey: 'mercadoId', otherKey: 'produtoId'})

ProdutosMercado.sync({force:false}).then(()=>{
    console.log("Tabela de ProdutosMercado criada!")
})

module.exports = ProdutosMercado