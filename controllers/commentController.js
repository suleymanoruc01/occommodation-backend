const commentService = require("../services/commentService");
const {
  successResponse,
  errorResponse,
} = require("../middlewares/responseMiddleware");
const { Accommodation, User } = require("../models");
const create = async (req, res) => {
  try {
    const { commentBody, userUid, accommodationUid } = req.body;
    if (!commentBody) {
      return errorResponse(res, "Required fields are missing", 400);
    }
    const user = await User.findOne({ where: { uid: userUid } });
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }
    const accommodation = await Accommodation.findOne({
      where: { uid: accommodationUid },
    });
    if (!accommodation) {
      return errorResponse(res, "accommodation not found", 404);
    }

    const comment = await commentService.createComment({
      commentBody,
      UserId: user.id,
      AccommodationId: accommodation.id,
    });

    return successResponse(res, comment);
  } catch (error) {
    console.error("Comment creation failed:", error);
    return errorResponse(res, error.message, 500, error);
  }
};

const getAll = async (req, res) => {
  try {
    const comments = await commentService.getAllComments();
    return successResponse(res, comments);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const getByUid = async (req, res) => {
  try {
    const uid = req.params.uid;
    if (!uid) return errorResponse(res, "Required fields are missing", 400);
    const comment = await commentService.getCommentByUid(req.params.uid);
    if (!comment) return errorResponse(res, "Comment not found", 404);
    return successResponse(res, comment);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const getUserComments = async (req, res) => {
  const uid = req.user.uid;
  if (!uid) return errorResponse(res, "Required fields are missing", 400);
  try {
    const comments = await commentService.getCommentsByUserUid(uid);
    if (!comments) return errorResponse(res, "User Comments not found", 404);
    return successResponse(res, comments);
  } catch (error) {
    return errorResponse(
      res,
      "Kullanıcının yorumları alınırken hata oluştu",
      500,
      error.message
    );
  }
};

const getAccommodationComments = async (req, res) => {
  const { uid } = req.params;
  if (!uid) return errorResponse(res, "Required fields are missing", 400);
  try {
    const comments = await commentService.getCommentsByAccommodationUid(uid);
    if (!comments)
      return errorResponse(res, "Accommodation Comments not found", 404);
    return successResponse(res, comments);
  } catch (error) {
    return errorResponse(
      res,
      "Konaklamaya ait yorumlar alınırken hata oluştu",
      500,
      error.message
    );
  }
};

const updateByUid = async (req, res) => {
  try {
    const { commentBody } = req.body;
    const uid = req.params.uid;
    if (!uid || !commentBody)
      return errorResponse(res, "Required fields are missing", 400);
    const updated = await commentService.updateCommentByUid(uid, req.body);
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

    const deleted = await commentService.deleteCommentByUid(req.params.uid);
    if (!deleted) return errorResponse(res, "Comment not found", 404);

    return res.status(204).send(); // Başarılı, içerik yok
  } catch (error) {
    return errorResponse(res, "Delete failed", 500, error);
  }
};

module.exports = {
  create,
  getAll,
  getByUid,
  getUserComments,
  getAccommodationComments,
  updateByUid,
  deleteByUid,
};
