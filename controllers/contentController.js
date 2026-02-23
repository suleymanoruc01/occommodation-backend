const { Accommodation } = require("../models");
const contentService = require("../services/contentService");
const {
  successResponse,
  errorResponse,
} = require("../middlewares/responseMiddleware");

const uploadContent = async (req, res) => {
  try {
    const files = req.files || (req.file ? [req.file] : []);
    const { AccommodationUid } = req.body;

    if (files.length === 0 || !AccommodationUid) {
      return errorResponse(
        res,
        "Dosya(lar) ve AccommodationUid zorunludur",
        400
      );
    }

    const maxSizeInMB = 5;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    // Boyut kontrolü (her dosya için)
    for (const file of files) {
      if (file.size > maxSizeInBytes) {
        return errorResponse(
          res,
          `Dosya boyutu ${maxSizeInMB} MB'den büyük olamaz.`,
          413
        );
      }
    }

    const accommodation = await Accommodation.findOne({
      where: { uid: AccommodationUid },
    });

    if (!accommodation) {
      return errorResponse(res, "Accommodation bulunamadı", 404);
    }

    const contents = [];

    for (const file of files) {
      const contentData = {
        contentUrl: file.location,
        type: file.mimetype,
        AccommodationId: accommodation.id,
      };

      const created = await contentService.createContent(contentData);
      contents.push(created);
    }

    return successResponse(res, contents);
  } catch (error) {
    console.error("Content upload failed:", error);
    return errorResponse(res, error.message, 500, error);
  }
};

const getContentsByAccommodation = async (req, res) => {
  try {
    const { accommodationUid } = req.params;

    const contents = await contentService.getContentsByAccommodationUid(
      accommodationUid
    );

    return successResponse(res, contents);
  } catch (error) {
    console.error("getContentsByAccommodation error:", error);
    return errorResponse(res, error.message, 404);
  }
};

const getAll = async (req, res) => {
  try {
    const contents = await contentService.getAllContents();
    return successResponse(res, contents);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};
const getByUid = async (req, res) => {
  try {
    const uid = req.params.uid;
    if (!uid) return errorResponse(res, "Required fields are missing", 400);
    const content = await contentService.getContentByUid(uid);
    if (!content) return errorResponse(res, "Content not found", 404);
    return successResponse(res, content);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const updateByUid = async (req, res) => {
  try {
    const { contentUrl, type } = req.body;
    const id = req.params.id;
    if (!id || !contentUrl || !type) {
      return errorResponse(res, "Required fields are missing", 400);
    }
    const updated = await contentService.updateContentByUid(
      req.params.uid,
      req.body
    );
    if (!updated) return errorResponse(res, "Comment not found", 404);
    return successResponse(res, updated);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const deleteByUid = async (req, res) => {
  try {
    const uid = req.params.uid;
    if (!uid) return errorResponse(res, "Required fields are missing", 400);
    const deleted = await contentService.deleteContentByUid(uid);

    if (!deleted) return errorResponse(res, "Comment not found", 404);

    return res.status(204).send(); // Başarılı, içerik yok
  } catch (error) {
    return errorResponse(res, "Delete failed", 500, error);
  }
};

module.exports = {
  uploadContent,
  getAll,
  getByUid,
  getContentsByAccommodation,
  updateByUid,
  deleteByUid,
};
