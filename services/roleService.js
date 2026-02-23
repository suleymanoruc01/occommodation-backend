const { Role, UserRole } = require("../models");

const createRole = async (data) => {
  const created = await Role.create(data);
  return created;
};

const getAllRoles = async () => {
  const roles = await Role.findAll({ include: [UserRole] });
  return roles;
};

const getRoleById = async (id) => {
  const role = await Role.findByPk(id, { include: [UserRole] });
  return role;
};

const updateRole = async (id, data) => {
  try {
    const role = await Role.findByPk(id);
    if (!role) return null;

    const updated = await role.update(data);
    return updated;
  } catch (error) {
    console.error("Error in updateRole:", error);
    throw error;
  }
};

const deleteRole = async (id) => {
  try {
    const role = await Role.findByPk(id);
    if (!role) return null;
    await role.destroy();
    return true;
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
