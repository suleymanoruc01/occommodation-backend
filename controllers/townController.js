const townService = require("../services/townService");
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
    const town = await townService.createTown(req.body);
    return successResponse(res, town);
  } catch (error) {
    console.error("Town creation failed:", error);
    return errorResponse(res, error.message, 500, error);
  }
};

const getAll = async (req, res) => {
  try {
    const towns = await townService.getAllTowns();
    return successResponse(res, towns);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return errorResponse(res, "Required fields are missing", 400);
    const town = await townService.getTownById(id);
    if (!town) return errorResponse(res, "Town not found", 404);
    return successResponse(res, town);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const getTownsByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const towns = await townService.getTownsByCityUid(cityId);
    return successResponse(res, towns);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to get towns by city");
  }
};

const update = async (req, res) => {
  try {
    const { name } = req.body;
    const id = req.params.id;
    if (!name || !id) {
      return errorResponse(res, "Required fields are missing", 400);
    }
    const updated = await townService.updateTown(id, req.body);
    if (!updated) return errorResponse(res, "Town not found", 404);
    return successResponse(res, updated);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return errorResponse(res, "Required fields are missing", 400);

    const deleted = await townService.deleteTown(req.params.id);
    if (!deleted) return errorResponse(res, "Town not found", 404);

    return res.status(204).send(); // Başarılı, içerik yok
  } catch (error) {
    return errorResponse(res, "Delete failed", 500, error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  getTownsByCity,
  update,
  remove,
};
