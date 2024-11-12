const express = require("express");
const multer = require("multer") 
const app = express();

const bodyParser = require('body-parser')

const connection = require('./database/database')

const mercadoModel = require('./database/mercados')

const produtoModel = require('./database/produto')

const produtoMercadoModel = require('./database/ProdutosMercado')

const localizacaoModel = require('./database/localizacao')

const { where } = require("sequelize");
const { raw } = require("mysql2");
const { error } = require("console");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/')
    },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const extensaoArquivo = file.originalname.split('.')[1];

        // Cria um código randômico que será o nome do arquivo
        const novoNomeArquivo = require('crypto')
            .randomBytes(64)
            .toString('hex');

        // Indica o novo nome do arquivo:
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});
 
var upload = multer ({dest : 'public/img/'})
upload =multer({storage})

connection.
      authenticate().
      then(()=>{
         console.log("Conectado ao banco de dados!")
      })
      .catch((msgErro)=>{
         console.log("msgErro")
})


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.set('view engine','ejs')

app.use(express.static('public'))


app.get("/cadProdutos/", function (req, res) {     
    res.render("cadProdutos");        
}); 

app.get("/cadmercado", function (req, res) { 
    res.render("cadMercado"); 
}); 

app.get("/addProdutosMercado/:id", function (req, res) {     
    let idMercado = req.params.id
    produtoModel.findAll({raw:true}).then(produtos => {
    res.render("addProdutosMercado",{
            idMercado :idMercado,
            produtos: produtos
        });     
    })   
}); 

app.get("/produtosMercado",(req,res)=>{
    produtoMercadoModel.findAll({raw:true}).then(produtomercado => {
        res.send(produtomercado)
    })
})


app.post("/submitMercado", upload.single('img'), function (req, res, next) { 
    var nome = req.body.nome
    var img = req.file.path.replace("public", "")
    console.log(img)
    
    mercadoModel.create({
        nome: nome,
        img:img
    }).then(()=>{
        res.redirect('/')
        
    }).catch((error) => {
        console.error(error);
        res.status(500).send("Erro ao criar mercado");
    });

});

app.post("/submitProdutosMercado", function (req, res) { 
    console.log(req.body)
});

app.post("/localizacao", function(req, res,){
    let produtoId = req.body.produtoId
    let mercadoId = req.body.mercadoId
    let latitude = req.params.latitude
    let longitude = req.params.longitude

    localizacaoModel.create({
        produtoId: produtoId,
        mercadoId: mercadoId,
        latitude: latitude,
        longitude: longitude
    }).then(()=>{
        console.log("cadastro de localizacao concluido")
    }).catch((error)=>{
        console.error(error);
        res.status(500).send("Erro ao criar localizacao");
    })
})

app.get("/localizacaoJson",(req,res)=>{
    produtoModel.findAll({raw:true}).then(produto => {
        res.send(produto)
    })
})

app.post("/submitProdutos", upload.single('imgProd'), function (req, res, next) { 
    var nome = req.body.nome
    var img = req.file.path.replace("public", "")
    
    produtoModel.create({
        nome: nome,
        img:img

    }).then(()=>{
        
        res.redirect('/')
    }).catch((error) => {
        console.error(error);
        res.status(500).send("Erro ao criar produto");
    });

});

app.get("/editarMercado/:id",(req,res)=>{
    var id = req.params.id
    mercadoModel.findAll({raw:true, where:{id: id}}).then(mercado=>{

        res.render("editMercado",{
            mercado : mercado[0]
        })
    })
})

app.post("/submitEditar", async (req, res)=>{
    var id = req.body.id
    var nome = req.body.nome

    
    let registro = await mercadoModel.findOne({ where:{id: id}})
    registro.nome = nome
    registro.save().then((i)=>{
        res.redirect('/')
    })

})



app.get("/excluirMercado/:id",(req,res)=>{
    var id = req.params.id
    mercadoModel.destroy({
       where: {
          id:id
       }
    }).then(()=>{
       res.redirect('back')
    })
})

app.get("/mercadosJson",(req,res)=>{
    mercadoModel.findAll({raw:true}).then(mercado => {
        res.send(mercado)
    })
})

app.get("/produtosJson/",(req,res)=>{
    produtoModel.findAll({raw:true}).then(produto => {
        res.send(produto)
    })
})

app.get("/produtosMercadoJson/",(req,res)=>{
    produtoModel.findAll({include:produtoMercadoModel, raw:true}).then(produto => {
        res.send(produto)
    })
})

app.get("/",(req,res)=>{
     
    mercadoModel.findAll({raw:true}).then(mercado =>{
       res.render('index',{
          mercado:mercado
       })
    })
    
 })
 
app.listen(8181, function (erro) { 
   if (erro) { 
       console.log("Erro"); 
   } else { 
       console.log("Servidor iniciado..."); 
   } 
}); 
