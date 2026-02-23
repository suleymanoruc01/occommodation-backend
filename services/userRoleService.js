const { UserRole, User, Role } = require("../models");

const createUserRole = async (data) => {
  return await UserRole.create(data);
};

const getAllUserRoles = async () => {
  return await UserRole.findAll({ include: [User, Role] });
};

const getUserRoleById = async (id) => {
  return await UserRole.findByPk(id, { include: [User, Role] });
};

const updateUserRole = async (id, data) => {
  const userRole = await UserRole.findByPk(id);
  if (!userRole) throw new Error("UserRole not found");
  return await userRole.update(data);
};

const deleteUserRole = async (id) => {
  const userRole = await UserRole.findByPk(id);
  if (!userRole) throw new Error("UserRole not found");
  return await userRole.destroy();
};

module.exports = {
  createUserRole,
  getAllUserRoles,
  getUserRoleById,
  updateUserRole,
  deleteUserRole,
};
