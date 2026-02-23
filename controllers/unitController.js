const unitService = require("../services/unitService");
const { Accommodation } = require("../models");
const {
  successResponse,
  errorResponse,
} = require("../middlewares/responseMiddleware");
const create = async (req, res) => {
  try {
    const { name, description, uid } = req.body;

    if (!name || !description || !uid) {
      return errorResponse(res, "Required fields are missing", 400);
    }
    const accommodation = await Accommodation.findOne({ where: { uid } });
    if (!accommodation) {
      return errorResponse(
        res,
        "Accommodation not found with provided UID",
        404
      );
    }

    // Unit oluşturulacak veri
    const unitData = {
      name,
      description,
      AccommodationId: accommodation.id,
    };

    const unit = await unitService.createUnit(unitData);

    return successResponse(res, unit);
  } catch (error) {
    console.error("Unit creation failed:", error);
    return errorResponse(res, error.message, 500, error);
  }
};

const getAll = async (req, res) => {
  try {
    const units = await unitService.getAllUnits();
    return successResponse(res, units);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const getByUid = async (req, res) => {
  try {
    const uid = req.params.uid;
    if (!uid) return errorResponse(res, "Required fields are missing", 400);

    const unit = await unitService.getUnitByUid(uid);

    if (!unit) return errorResponse(res, "Unit not found", 404);
    return successResponse(res, unit);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const getUnitsByAccommodationUid = async (req, res) => {
  try {
    const { accommodationUid } = req.params;
    const units = await unitService.getUnitsByAccommodationUid(
      accommodationUid
    );
    return successResponse(res, units);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to fetch units", 500);
  }
};

const updateByUid = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    const uid = req.params.uid;
    if (!uid || !name || !description || !isActive) {
      return errorResponse(res, "Required fields are missing", 400);
    }

    const updated = await unitService.updateUnitByUid(uid, req.body);
    if (!updated) return errorResponse(res, "Unit not found", 404);
    return successResponse(res, updated);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const softDeleteUnit = async (req, res) => {
  const { uid } = req.params;

  if (!uid) {
    return errorResponse(res, "Unit UID is required", 400);
  }

  try {
    const unit = await unitService.getUnitByUid(uid);

    if (!unit || unit.isDeleted) {
      return errorResponse(res, "Unit not found or already deleted", 404);
    }

    unit.isDeleted = true;
    await unit.save();

    return successResponse(res, { message: "Unit deleted (soft)" });
  } catch (error) {
    return errorResponse(
      res,
      "Birim silinirken bir hata oluştu",
      500,
      error.message
    );
  }
};

const deleteByUid = async (req, res) => {
  try {
    const uid = req.params.uid;
    if (!uid) return errorResponse(res, "Required fields are missing", 400);
    const deleted = await unitService.deleteUnitByUid(uid);
    if (!deleted) return errorResponse(res, "Unit not found", 404);

    return res.status(204).send(); // Başarılı, içerik yok
  } catch (error) {
    return errorResponse(res, "Delete failed", 500, error);
  }
};

module.exports = {
  create,
  getAll,
  getByUid,
  getUnitsByAccommodationUid,
  updateByUid,
  softDeleteUnit,
  deleteByUid,
};
