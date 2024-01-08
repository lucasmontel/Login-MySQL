//Dependencias
const express = require("express");
const router = express.Router();
const User = require("../Users");



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