const { Content, Accommodation } = require("../models");

const createContent = async (data) => {
  const created = await Content.create(data);
  return created;
};

const getAllContents = async () => {
  const contents = await Content.findAll({ include: [Accommodation] });
  return contents;
};

const getContentsByAccommodationUid = async (accommodationUid) => {
  const accommodation = await Accommodation.findOne({
    where: { uid: accommodationUid },
  });

  if (!accommodation) {
    throw new Error("Accommodation bulunamadı");
  }

  const contents = await Content.findAll({
    where: { AccommodationId: accommodation.id },
  });

  return contents;
};

const getContentByUid = async (uid) => {
  const content = await Content.findOne({
    where: { uid },
    include: [Accommodation],
  });
  return content;
};

const updateContentByUid = async (uid, data) => {
  try {
    const content = await Content.findOne({ where: { uid } });
    if (!content) return null;

    const updated = await content.update(data);
    return updated;
  } catch (error) {
    console.error("Error in updateContent:", error);
    throw error;
  }
};

const deleteContentByUid = async (uid) => {
  try {
    const content = await Content.findOne({ where: { uid } });
    if (!content) return null;
    await content.destroy();
    return true;
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

module.exports = {
  createContent,
  getAllContents,
  getContentsByAccommodationUid,
  getContentByUid,
  updateContentByUid,
  deleteContentByUid,
};
