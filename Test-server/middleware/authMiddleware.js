const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    console.log("Auth headers:", req.headers.authorization); // Для отладки
    const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN
    console.log("Extracted token:", token); // Для отладки

    if (!token) {
      return res.status(401).json({ message: "Не авторизован" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Для отладки

    req.user = decoded;
    next();
  } catch (e) {
    console.error("Auth error:", e.message); // Для отладки
    res.status(401).json({ message: "Не авторизован: " + e.message });
  }
};
