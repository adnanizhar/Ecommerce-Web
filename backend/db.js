const Sequelize = require('sequelize');
const sequelize = new Sequelize('test_database', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;