// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { UserRole } = require("../models");

const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token gerekli" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Geçersiz token" });
  }
};

const checkRole = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Bu işlem için yetkiniz yok." });
    }
    next();
  };
};

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "Token gerekli" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      where: { uid: decoded.uid },
      include: UserRole,
    });

    if (!user) {
      return res.status(401).json({ message: "Kullanıcı bulunamadı" });
    }

    req.user = {
      uid: user.uid,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.UserRole?.role || "user",
    };
    next();
  } catch (err) {
    console.log("✅ JWT error:", err);
    return res.status(403).json({ message: "Token geçersiz" });
  }
};

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Token bulunamadı." });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { uid, email, role }
    next();
  } catch (err) {
    res.status(401).json({ message: "Geçersiz token." });
  }
};

module.exports = { verifyToken, checkRole, authenticateToken, authMiddleware };
