const Router = require('express');
const router = new Router();
const productsRouter = require('./ProductsListRouter');
const userRouter = require('./userRouter');
const adminRouter = require('./adminRouter');

// Сначала подключаем маршруты администратора
router.use('/admin', adminRouter);
// Затем маршруты пользователя
router.use('/user', userRouter);
// И наконец, маршруты продуктов
router.use('/', productsRouter);

module.exports = router;