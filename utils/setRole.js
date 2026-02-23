// utils/setRole.js
const { Role, UserRole } = require("../models");

const setRole = async (userId, roleName = "user") => {
  const role = await Role.findOne({ where: { name: roleName } });

  if (!role) {
    throw new Error(`Rol bulunamadı: ${roleName}`);
  }

  return await UserRole.create({
    UserId: userId,
    RoleId: role.id,
  });
};

module.exports = setRole;
