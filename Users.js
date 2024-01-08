const Sequelize = require("sequelize");
const sequelize = require("./main")

const User = sequelize.define("root", "root",{
    email: {
        type: Sequelize.STRING,
        require: true
    },
    password: {
        type: Sequelize.TEXT,
        require: true
    }
});
module.exports = User;