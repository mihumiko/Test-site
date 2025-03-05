const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'USER'
    }
});

// Синхронизация модели с базой данных
User.sync()
    .then(() => {
        console.log('Таблица User успешно создана или уже существует');
    })
    .catch(error => {
        console.error('Ошибка при создании таблицы User:', error);
    });

module.exports = User;
