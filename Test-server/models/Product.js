const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ingredients: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
}, {
    tableName: 'products',
    timestamps: true
});

// Экспортируем функцию синхронизации отдельно
module.exports.syncProduct = async () => {
    try {
        await Product.sync({ alter: true });
        console.log('Таблица Product успешно создана или обновлена');
    } catch (error) {
        console.error('Ошибка при создании/обновлении таблицы Product:', error);
    }
};

module.exports = Product; 