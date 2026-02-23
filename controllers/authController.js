// controllers/authController.js
const authService = require("../services/authService");
const {
  successResponse,
  errorResponse,
} = require("../middlewares/responseMiddleware");
const { updatePassword } = require("../services/authService.js");

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    console.log("result");
    console.log(result);
    return successResponse(res, result);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const registerOwnerController = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    if (!name || !surname || !email || !password) {
      return errorResponse(res, "Lütfen tüm alanları doldurun.", 400);
    }

    const result = await authService.registerOwner({
      name,
      surname,
      email,
      password,
    });
    return successResponse(res, result);
  } catch (err) {
    return errorResponse(res, err.message || "Owner kaydı başarısız.", 500);
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    return successResponse(res, result);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const updatePasswordController = async (req, res) => {
  try {
    const uid = req.user.uid; // JWT'den gelen kullanıcı UID'si
    const { currentPassword, newPassword } = req.body;

    const result = await updatePassword({ uid, currentPassword, newPassword });
    successResponse(res, result);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = {
  register,
  registerOwnerController,
  login,
  updatePasswordController,
};
