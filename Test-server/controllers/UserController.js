const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {
  static TOKEN_EXPIRATION = "1h";
  static JWT_SECRET = process.env.JWT_SECRET;

  async register(req, res) {
    try {
      const { email, password, name } = req.body;
      console.log("Попытка регистрации:", { email, name });

      if (!email || !password || !name) {
        return res
          .status(400)
          .json({ message: "Все поля обязательны для заполнения" });
      }

      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        console.log("Пользователь уже существует:", email);
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже существует" });
      }

      const hashPassword = await bcrypt.hash(password, 8);
      console.log("Пароль захеширован");

      const user = await User.create({
        email,
        password: hashPassword,
        name,
      });
      console.log("Пользователь создан:", { id: user.id, email: user.email });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        UserController.JWT_SECRET,
        { expiresIn: UserController.TOKEN_EXPIRATION }
      );
      console.log("Токен создан");

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Детальная ошибка при регистрации:", error);
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: "Ошибка валидации данных" });
      }
      if (error.name === "SequelizeUniqueConstraintError") {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже существует" });
      }
      return res
        .status(500)
        .json({ message: "Ошибка при регистрации: " + error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log("Попытка входа:", { email });

      if (!email || !password) {
        return res.status(400).json({ message: "Email и пароль обязательны" });
      }

      const user = await User.findOne({ where: { email } });
      console.log(
        "Результат поиска пользователя:",
        user ? "найден" : "не найден"
      );

      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      console.log("Проверка пароля:", validPassword ? "верный" : "неверный");

      if (!validPassword) {
        return res.status(400).json({ message: "Неверный пароль" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        UserController.JWT_SECRET,
        { expiresIn: UserController.TOKEN_EXPIRATION }
      );
      console.log("Токен создан");

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Детальная ошибка при входе:", error);
      return res
        .status(500)
        .json({ message: "Ошибка при входе: " + error.message });
    }
  }

  async check(req, res) {
    try {
      console.log("Проверка токена для пользователя:", req.user.id);

      const user = await User.findByPk(req.user.id);
      console.log("Пользователь найден:", user ? "да" : "нет");

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      return res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Детальная ошибка при проверке токена:", error);
      return res
        .status(500)
        .json({ message: "Ошибка при проверке токена: " + error.message });
    }
  }
}

module.exports = new UserController();
