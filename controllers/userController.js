const userService = require("../services/userService");

const {
  successResponse,
  errorResponse,
} = require("../middlewares/responseMiddleware");

const { userDto } = require("../dtos/userDTO");

const createUser = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;
    if (!name || !surname || !email || !password) {
      return errorResponse(res, "Required fields are missing", 400);
    }
    const existing = await userService.findByEmail(email); // findOne veya benzeri
    if (existing) {
      return errorResponse(res, "Email is already in use", 409);
    }
    const user = await userService.createUser(req.body);
    return successResponse(res, user);
  } catch (error) {
    console.error("User creation failed:", error);
    return errorResponse(res, error.message, 500, error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return successResponse(res, users);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const getUserByUid = async (req, res) => {
  try {
    const uid = req.user.uid;
    if (!uid) return errorResponse(res, "Required fields are missing", 400);
    const user = await userService.getUserByUid(uid);
    if (!user) return errorResponse(res, "User not found", 404);
    userdto = userDto(user);
    return successResponse(res, userdto);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const updateUserRole = async (req, res) => {
  const { uid } = req.user.uid;
  const { role } = req.body;

  try {
    const result = await userService.updateUserRole(uid, role);
    return successResponse(res, result);
  } catch (error) {
    return errorResponse(res, error.message, error.status || 500);
  }
};

const updateUserByUid = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;
    const uid = req.user.uid;
    if (!uid || !name || !surname || !email || !password) {
      return errorResponse(res, "Required fields are missing", 400);
    }
    const updated = await userService.updateUser(req.params.uid, req.body);
    if (!updated) return errorResponse(res, "User not found", 404);
    return successResponse(res, updated);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const deleteUserByUid = async (req, res) => {
  try {
    const uid = req.user.uid;
    if (!uid) return errorResponse(res, "Required fields are missing", 400);

    const deleted = await userService.deleteUser(uid);
    if (!deleted) return errorResponse(res, "User not found", 404);

    return res.status(204).send(); // Başarılı, içerik yok
  } catch (error) {
    return errorResponse(res, "Delete failed", 500, error);
  }
};
module.exports = {
  createUser,
  getAllUsers,
  getUserByUid,
  updateUserRole,
  updateUserByUid,
  deleteUserByUid,
};
