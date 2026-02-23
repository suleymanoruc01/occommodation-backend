// services/authService.js
const { User, UserRole, Role } = require("../models/index.js");
const jwt = require("jsonwebtoken");
const setRole = require("../utils/setRole.js");

const register = async ({ name, surname, email, password, role }) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error("Bu email zaten kayıtlı.");

  const newUser = await User.create({ name, surname, email, password });

  const selectedRole = role || "user"; // 👈 burada rol kontrolü
  await setRole(newUser.id, selectedRole);

  const token = jwt.sign(
    { uid: newUser.uid, email: newUser.email, selectedRole },
    process.env.JWT_SECRET,
    { expiresIn: "3h" }
  );

  return { token };
};

const registerOwner = async (userData) => {
  return await register({ ...userData, role: "owner" });
};

const login = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email },
    include: [{ model: UserRole, include: Role }],
  });
  if (!user || user.password !== password)
    throw new Error("Geçersiz email veya şifre.");

  const role = user.UserRole?.Role?.name || "user";

  const token = jwt.sign(
    { uid: user.uid, email: user.email, role },
    process.env.JWT_SECRET,
    { expiresIn: "3h" }
  );

  return { token };
};

const updatePassword = async ({ uid, currentPassword, newPassword }) => {
  const user = await User.findOne({ where: { uid } });
  if (!user) throw new Error("Kullanıcı bulunamadı.");

  if (user.password !== currentPassword)
    throw new Error("Mevcut şifre hatalı.");

  user.password = newPassword;
  await user.save();

  return { message: "Şifre başarıyla güncellendi." };
};

module.exports = { register, registerOwner, login, updatePassword };
