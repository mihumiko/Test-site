const jwt = require("jsonwebtoken");


module.exports = function(role){
    return function(req, res, next){
        const token = req.headers.authorization;
        if(req.metod === "OPTIONS"){
            next();
            return;
        }
        try{
            const token = req.headers.authorization.split(" ")[1];
            if(!token){
                return res.status(401).json({message: "Не авторизован"});
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if(decoded.role !== role){
                return res.status(403).json({message: "Нет доступа"});
            }
            req.user = decoded;
            next();
        }catch(error){
            res.status(401).json({message: "Не авторизован"});
        }
        
    }
}
