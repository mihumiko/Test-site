const Product = require("../models/Product");
const path = require("path");
const fs = require("fs");

class AdminController {
  async allowAccess(req, res) {
    try {
      res.json({ message: "Доступ разрешен" });
    } catch (error) {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async addProduct(req, res) {
    try {
      console.log('Получены данные:', req.body);
      console.log('Получены файлы:', req.files);

      const { name, price, description, ingredients } = req.body;
      const image = req.files?.image;

      if (!name || !price || !description || !ingredients) {
        return res.status(400).json({ message: "Все поля обязательны для заполнения" });
      }

      let imagePath = null;
      if (image) {
        const fileName = Date.now() + path.extname(image.name);
        const uploadPath = path.join(__dirname, "../static", fileName);
        
        await image.mv(uploadPath);
        imagePath = fileName;
      }
 
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

  async editProduct(req, res) {
    try {
      res.json({ message: "Продукт отредактирован" });
    } catch (error) {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      console.log('Удаление продукта с ID:', id);

      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: "Продукт не найден" });
      }

      if (product.image) {
        const imagePath = path.join(__dirname, "../static", product.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      await product.destroy();
      
      res.json({ message: "Продукт успешно удален" });
    } catch (error) {
      console.error("Ошибка при удалении продукта:", error);
      res.status(500).json({ message: "Ошибка при удалении продукта" });
    }
  }
}

module.exports = new AdminController();
