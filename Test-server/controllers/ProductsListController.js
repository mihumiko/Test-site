const Product = require("../models/Product");

class ProductListController {
  // Загрузка всех продуктов
  async getAll(req, res) {
    try {
      const products = await Product.findAll();
      if (products.length > 0) {
        res.json(products);
      } else {
        res.status(404).json({ message: "Продукты не найдены" });
      }
    } catch (error) {
      console.error("Ошибка при получении продуктов:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }
  // Загрузка одного продукта
  async takeOne(req, res) {
    try {
      const product = await Product.findByPk(parseInt(req.params.id));
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Продукт не найден" });
      }
    } catch (error) {
      console.error("Ошибка при получении продукта:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }
}

module.exports = new ProductListController();
