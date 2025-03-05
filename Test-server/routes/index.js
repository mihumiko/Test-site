const Router = require('express');
const router = new Router();
const productsRouter = require('./ProductsListRouter');
const userRouter = require('./userRouter');

router.use('/', productsRouter);
router.use('/user', userRouter);

module.exports = router;