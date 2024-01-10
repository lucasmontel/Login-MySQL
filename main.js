const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes/router");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");

//Configurando Sequelize para se conectar com MySQL
const db = new Sequelize("loginmysql", "root", "jesus1981", {
    host: "localhost",
    dialect: "mysql"
})

//Tentando conexão
db.authenticate().then(() => {
    console.log("Conectado ao MySQL!");
}).catch((err) => {
    console.log("Não conectado ao MySQL:", err);
});

//Modelo de tabela
const User = db.define("user", {
    email: {
        type: Sequelize.STRING,
        required: true
    },
    password: {
        type: Sequelize.TEXT,
        required: true
    }
});
module.exports = User;

//Body Parser
//Dizemos que o Body Parser pode receber qualquer tipo de dados, não só dados específicos
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Definindo Rotas
app.use("/login", routes);

//Definindo maquina de vizualização
app.set("view engine", "ejs");

//Onde estão os arquivos estáticos

//CSS
app.use(express.static(path.join(__dirname, "/public/css")));
//JS
app.use(express.static(path.join(__dirname, "/public/js")));

//Arquivos de renderização:
app.set("views", path.join(__dirname, "/views/"));


const door = 3700;
app.listen(door, () => {
    console.log(`Start Success in door! ${door}`);
});