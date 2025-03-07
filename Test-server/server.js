const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const sequelize = require("./db");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/static", express.static("static"));
app.use("/", router);

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
