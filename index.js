//configurações iniciais
const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

const bodyParser = require('body-parser')

//configurações da conexão ao banco
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'cadastro'
})

app.use(bodyParser.urlencoded({extended: false}))

//setando diretório de assets, path e view engine
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//setando a connection como dependencia
const dependencies = {
    connection
}

//rota de teste renderizando home.ejs
app.get('/', (req, res) => res.render('home'))

//chamando module pessoas
const pessoas = require('./routes/pessoas')
const home = require('./routes/home')

//middleware /pessoas passando dependencies
app.use('/pessoas', pessoas(dependencies))

//injetando a dependencia da connection
connection.connect( (err) => {
    if(!err) {
        app.listen(port, () => {
            console.log('projeto-crud listening on port '+ port)
        })
    }else {
        console.log('Algo deu errado!\nErro: ' + err)
    }
})