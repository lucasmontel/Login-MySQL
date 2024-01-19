const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");

// Configurando Sequelize para se conectar com MySQL
const db = new Sequelize("loginmysql", "root", "jesus1981", {
  host: "localhost",
  dialect: "mysql",
});

// Modelo de tabela
const User = db.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Sincronizando o sequelize com o banco de dados;
db.authenticate()
  .then(() => {
    console.log("Modelo sincronizado com o banco de dados!");
  })
  .catch((err) => {
    console.error("Erro ao sincronizar modelo:", err);
  });

  
  //Rotas
router.get("/login", (req, res) => {
  res.render("login");
});

// Tratamento
router.post("/tratando", async (req, res) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    res.send("Usuário criado com sucesso!");
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).send("Erro ao criar usuário.");
  }
});

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Definindo maquina de visualização
app.set("view engine", "ejs");

// Arquivos de renderização
app.set("views", path.join(__dirname, "/views"));

// Usando as rotas definidas
app.use("/", router);

// Onde estão os arquivos estáticos
// CSS
app.use(express.static(path.join(__dirname, "/public/css")));
// JS
app.use(express.static(path.join(__dirname, "/public/js")));

const door = 4900;
app.listen(door, () => {
  console.log(`Servidor iniciado com sucesso na porta ${door}`);
});
