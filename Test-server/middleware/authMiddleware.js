const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    console.log("Auth headers:", req.headers.authorization);
    const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN
    console.log("Extracted token:", token);

    if (!token) {
      console.log("Token not found in headers");
      return res.status(401).json({ message: "Не авторизован" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    console.log("Decoded token:", decoded);

    if (!decoded || !decoded.id) {
      console.log("Invalid token structure");
      return res.status(401).json({ message: "Неверный формат токена" });
    }

    req.user = decoded;
    next();
  } catch (e) {
    console.error("Auth error:", e.message);
    if (e.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Токен истек" });
    }
    return res.status(401).json({ message: "Не авторизован: " + e.message });
  }
};
