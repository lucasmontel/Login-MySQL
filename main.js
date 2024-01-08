const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes/router");
const bodyParser = require("body-parser");


const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("usuarios", "root", "", {
    host: "localhost",
    dialect: "mysql"
})



sequelize.authenticate().then(() => {
    console.log("Conectado ao MySQL!");
}).catch((err) => {
    console.log("Não conectado ao MySQL:", err);
});


module.exports = sequelize;

//Body Parser
//Dizemos que o Body Parser pode receber qualquer tipo de dados, não só dados específicos
app.use(bodyParser.urlencoded({ extended: true }));

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