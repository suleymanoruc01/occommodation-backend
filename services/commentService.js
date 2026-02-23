const { Comment, User, Accommodation } = require("../models");

const createComment = async (data) => {
  const created = await Comment.create(data);
  return created;
};

const getAllComments = async () => {
  const comments = await Comment.findAll({ include: [User, Accommodation] });
  return comments;
};

const getCommentByUid = async (uid) => {
  const comment = await Comment.findOne({
    where: { uid },
    include: [User, Accommodation],
  });
  return comment;
};

const getCommentsByUserUid = async (userUid) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          where: { uid: userUid },
          attributes: [], // sadece eşleşme için
        },
        {
          model: Accommodation,
        },
      ],
    });

    return comments;
  } catch (error) {
    console.error("Error in Get user comments:", error);
    throw error;
  }
};

const getCommentsByAccommodationUid = async (accommodationUid) => {
  return await Comment.findAll({
    where: { accommodationUid },
    include: [
      {
        model: User,
        attributes: ["uid", "fullName", "email"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

const updateCommentByUid = async (uid, data) => {
  try {
    const comment = await Comment.findOne({ where: { uid } });
    if (!comment) return null;

    const updated = await comment.update(data);
    return updated;
  } catch (error) {
    console.error("Error in updateComment:", error);
    throw error;
  }
};

const deleteCommentByUid = async (uid) => {
  try {
    const comment = await Comment.findOne({ where: { uid } });
    if (!comment) return null;
    await comment.destroy();
    return true;
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

module.exports = {
  createComment,
  getAllComments,
  getCommentByUid,
  getCommentsByUserUid,
  getCommentsByAccommodationUid,
  updateCommentByUid,
  deleteCommentByUid,
};
