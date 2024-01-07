//Dependencias
const express = require("express");
const router = express.Router();
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


const User = sequelize.define("usuario", {
    email: {
        type: Sequelize.STRING,
        require: true
    },
    password: {
        type: Sequelize.TEXT,
        require: true
    }
});


router.get("/", (req, res) => {
    res.render("login");
});

//Tratamento
router.post("/tratando", async (req, res) => {
    try {
        const newUser = await User.create({
            email: req.body.email,
            password: req.body.password,
        });
        res.send("Usuário Criado");
    } catch (err) {
        res.send("Usuário não criado, erro: " + err);
    }
});


module.exports = router;