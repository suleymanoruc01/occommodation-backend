const cityService = require("../services/cityService");
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

    const city = await cityService.createCity(req.body);
    return successResponse(res, city);
  } catch (error) {
    console.error("City creation failed:", error);
    return errorResponse();
  }
};

const getAll = async (req, res) => {
  try {
    const cities = await cityService.getAllCities();
    return successResponse(res, cities);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return errorResponse(res, "Required fields are missing", 400);
    const city = await cityService.getCityById(id);
    if (!city) return errorResponse(res, "City not found", 404);
    return successResponse(res, city);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const update = async (req, res) => {
  try {
    const { name } = req.body;
    const id = req.params.id;
    if (!id) return errorResponse(res, "Required fields are missing", 400);
    const updated = await cityService.updateCity(id, req.body);
    if (!updated) return errorResponse(res, "Accommodation not found", 404);
    return successResponse(res, updated);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return errorResponse(res, "Required fields are missing", 400);
    const deleted = await cityService.deleteCity(req.params.id);
    if (!deleted) return errorResponse(res, "Accommodation not found", 404);

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
