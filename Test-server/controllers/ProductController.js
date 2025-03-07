const Product = require("../models/Product");
const path = require("path");
const fs = require("fs");

class ProductController {
  async create(req, res) {
    try {
      const { name, price, description, ingredients } = req.body;
      const image = req.files?.image;

      // Проверка обязательных полей
      if (!name || !price || !description || !ingredients) {
        return res.status(400).json({ message: "Все поля обязательны для заполнения" });
      }

      // Проверка и сохранение изображения
      let imagePath = null;
      if (image) {
        const fileName = Date.now() + path.extname(image.name);
        const uploadPath = path.join(__dirname, "../static", fileName);
        
        await image.mv(uploadPath);
        imagePath = fileName;
      }

      // Создание продукта в базе данных
      const product = await Product.create({
        name,
        price: parseFloat(price),
        description,
        ingredients: JSON.parse(ingredients),
        image: imagePath
      });

      return res.status(201).json(product);
    } catch (error) {
      console.error("Ошибка при создании продукта:", error);
      
      // Удаление загруженного файла в случае ошибки
      if (req.files?.image) {
        const fileName = Date.now() + path.extname(req.files.image.name);
        const uploadPath = path.join(__dirname, "../static", fileName);
        if (fs.existsSync(uploadPath)) {
          fs.unlinkSync(uploadPath);
        }
      }

      return res.status(500).json({ 
        message: "Ошибка при создании продукта",
        error: error.message 
      });
    }
  }

  async getAll(req, res) {
    try {
      const products = await Product.findAll();
      return res.json(products);
    } catch (error) {
      console.error("Ошибка при получении продуктов:", error);
      return res.status(500).json({ message: "Ошибка при получении продуктов" });
    }
  }

  async getOne(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Продукт не найден" });
      }
      return res.json(product);
    } catch (error) {
      console.error("Ошибка при получении продукта:", error);
      return res.status(500).json({ message: "Ошибка при получении продукта" });
    }
  }
}

module.exports = new ProductController(); 