const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_NAME || 'testdb',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'postgres',
    {
        dialect: process.env.DB_DIALECT || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        logging: console.log,  // Включаем логирование SQL-запросов
        define: {
            timestamps: true  // Включаем автоматические поля createdAt и updatedAt
        }
    }
)

// Проверка подключения
sequelize
    .authenticate()
    .then(() => {
        console.log('Подключение к БД успешно установлено');
    })
    .catch(err => {
        console.error('Ошибка при подключении к БД:', err);
    });

module.exports = sequelize