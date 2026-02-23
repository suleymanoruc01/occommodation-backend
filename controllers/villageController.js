const villageService = require("../services/villageService");
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

    const village = await villageService.createVillage(req.body);
    return successResponse(res, village);
  } catch (error) {
    console.error("Village creation failed:", error);
    return errorResponse(res, error.message, 500, error);
  }
};

const getAll = async (req, res) => {
  try {
    const villages = await villageService.getAllVillages();
    return successResponse(res, villages);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return errorResponse(res, "Required fields are missing", 400);
    const village = await villageService.getVillageById(id);
    if (!village) return errorResponse(res, "Village not found", 404);
    return successResponse(res, village);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const getVillagesByTown = async (req, res) => {
  try {
    const { townId } = req.params;
    const villages = await villageService.getVillagesByTownId(townId);
    return successResponse(res, villages);
  } catch (error) {
    return errorResponse(
      res,
      error.message || "Failed to get villages by town"
    );
  }
};

const update = async (req, res) => {
  try {
    const { name } = req.body;
    const id = req.params.id;
    if (!name || !id) {
      return errorResponse(res, "Required fields are missing", 400);
    }
    const updated = await villageService.updateVillage(id, req.body);
    if (!updated) return errorResponse(res, "Village not found", 404);
    return successResponse(res, updated);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return errorResponse(res, "Required fields are missing", 400);

    const deleted = await villageService.deleteVillage(req.params.id);
    if (!deleted) return errorResponse(res, "Village not found", 404);

    return res.status(204).send(); // Başarılı, içerik yok
  } catch (error) {
    return errorResponse(res, "Delete failed", 500, error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  getVillagesByTown,
  update,
  remove,
};
