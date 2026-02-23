const roleService = require("../services/roleService");
const {
  successResponse,
  errorResponse,
} = require("../middlewares/responseMiddleware");

const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return errorResponse(res, "Required fields are missing", 400);
    }
    const role = await roleService.createRole(req.body);
    return successResponse(res, role);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const getAll = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    return successResponse(res, roles);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return errorResponse(res, "Required fields are missing", 400);
    const role = await roleService.getRoleById(id);
    if (!role) return errorResponse(res, "Role not found", 404);
    return successResponse(res, role);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const update = async (req, res) => {
  try {
    const { name } = req.body;
    const id = req.params.id;
    if (!name || !id) {
      return errorResponse(res, "Required fields are missing", 400);
    }
    const updated = await roleService.updateRole(id, req.body);
    if (!updated) return errorResponse(res, "Role not found", 404);
    return successResponse(res, updated);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return errorResponse(res, "Required fields are missing", 400);

    const deleted = await roleService.deleteRole(req.params.id);
    if (!deleted) return errorResponse(res, "Role not found", 404);

    return res.status(204).send(); // Başarılı, içerik yok
  } catch (error) {
    return errorResponse(res, "Delete failed", 500, error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
