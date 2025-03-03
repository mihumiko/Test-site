const sequelize = require('./db');
const Product = require('./models/Product');
const initialData = require('./data')('http://localhost:5000');

const syncDatabase = async () => {
  try {
    console.log('Начинаем синхронизацию базы данных...');
    
    await sequelize.sync({ force: true });
    console.log('Таблица Products пересоздана');

    console.log('Заполняем таблицу начальными данными...');
    await Product.bulkCreate(initialData);
    
    const count = await Product.count();
    console.log(`База данных успешно синхронизирована. Количество записей: ${count}`);
    
    const products = await Product.findAll();
    console.log('\nСписок продуктов:');
    products.forEach(product => {
      console.log(`- ${product.name}`);
    });

    await sequelize.close();
    console.log('\nСоединение с базой данных закрыто');
    
  } catch (error) {
    console.error('Ошибка при синхронизации базы данных:', error);
    process.exit(1);
  }
};

syncDatabase(); 