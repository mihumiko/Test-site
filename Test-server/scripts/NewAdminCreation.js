const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { syncUser } = require("../models/User");
const sequelize = require("../db");

async function createAdmin() {
    try {
        await sequelize.authenticate();
        console.log("Подключение к БД успешно установлено");

        // Синхронизируем модель User
        await syncUser();
        
        const admin = {
            email: "mihumiko@gmail.com",
            password: "root",
            name: "mihumiko",
            role: "ADMIN",
        };
        const existingAdmin = await User.findOne({
            where: { role: "ADMIN" },
        });
        if(existingAdmin){
            console.log("Администратор уже существует");
            return;
        }
        const hashedPassword = await bcrypt.hash(admin.password, 8);

        const newAdmin = await User.create({
            email: admin.email,
            password: hashedPassword,
            name: admin.name,
            role: admin.role,
        });
        
        console.log("Администратор успешно создан:", {
            id: newAdmin.id,
            email: newAdmin.email,
            name: newAdmin.name,
            role: newAdmin.role
        });

    } catch(error) {
        console.error("Ошибка при создании администратора:", error);
    } finally {
        await sequelize.close();
    }
}

createAdmin();


