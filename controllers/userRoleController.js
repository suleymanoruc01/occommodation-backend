const userRoleService = require("../services/userRoleService");
const {
  successResponse,
  errorResponse,
} = require("../middlewares/responseMiddleware");

const create = async (req, res) => {
  try {
    const userRole = await userRoleService.createUserRole(req.body);
    res.status(201).json(userRole);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const userRoles = await userRoleService.getAllUserRoles();
    res.json(userRoles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const userRole = await userRoleService.getUserRoleById(req.params.id);
    if (!userRole) return res.status(404).json({ error: "UserRole not found" });
    res.json(userRole);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const updated = await userRoleService.updateUserRole(
      req.params.id,
      req.body
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await userRoleService.deleteUserRole(req.params.id);
    res.json({ message: "UserRole deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
