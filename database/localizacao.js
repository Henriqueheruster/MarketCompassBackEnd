const sequelize = require('sequelize')
const connection = require('./database')
const produtos = require('./produto')
const mercado = require('./mercados')

const localizacao = connection.define('localizacao',{
    id:{
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },       
    produtoId:{
        type: sequelize.INTEGER,
        allowNull: false,        
        references:{
            model: produtos,
            key: 'id'
        }
    },
    mercadoId:{
        type: sequelize.INTEGER,
        allowNull: false,        
        references:{
            model: mercado,
            key: 'id'
        }
    },
    latitude:{
        type: sequelize.FLOAT,
        allowNull: true
    },
    longitude:{
        type: sequelize.FLOAT,
        allowNull: true
    }

}, {timestamps: false})

produtos.hasMany(localizacao, { foreignKey: 'produtoId' });
mercado.hasMany(localizacao, { foreignKey: 'mercadoId' });
localizacao.belongsTo(produtos, { foreignKey: 'produtoId' });
localizacao.belongsTo(mercado, { foreignKey: 'mercadoId' });
  
localizacao.sync({force:false}).then(()=>{
    console.log("Tabela de localizacao criada!")
})

module.exports = localizacao