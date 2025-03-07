const Router = require('express');
const router = new Router();
const AdminController = require('../controllers/AdminController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');
const fileUpload = require('express-fileupload');

// Настройка загрузки файлов
router.use(fileUpload({
    createParentPath: true,
    limits: { 
        fileSize: 50 * 1024 * 1024 // 50MB max file size
    },
    abortOnLimit: true
}));

// Проверка авторизации для всех маршрутов
router.use(authMiddleware);

// Маршруты администратора
router.get('/', checkRole("ADMIN"), AdminController.allowAccess);
router.post('/add', checkRole("ADMIN"), AdminController.addProduct);
router.post('/edit', checkRole("ADMIN"), AdminController.editProduct);
router.post('/delete/:id', checkRole("ADMIN"), AdminController.deleteProduct);

module.exports = router;
