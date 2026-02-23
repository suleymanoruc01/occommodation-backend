const { Unit, Accommodation, Booking } = require("../models");

const createUnit = async (data) => {
  const created = await Unit.create(data);
  return created;
};

const getAllUnits = async () => {
  const units = await Unit.findAll({
    where: { isDeleted: false },
    include: [Accommodation, Booking],
  });
  return units;
};

const getUnitByUid = async (uid) => {
  const unit = await Unit.findOne({
    where: { uid, isDeleted: false },
    include: [Accommodation, Booking],
  });
  return unit;
};

const getUnitsByAccommodationUid = async (accommodationUid) => {
  const accommodation = await Accommodation.findOne({
    where: { uid: accommodationUid, isDeleted: false },
  });

  if (!accommodation) {
    throw new Error("Accommodation not found");
  }

  const units = await Unit.findAll({
    where: {
      AccommodationId: accommodation.id,
      isDeleted: false,
    },
  });

  return units;
};

const updateUnitByUid = async (uid, data) => {
  try {
    const unit = await Unit.findOne({ where: { uid } });
    if (!unit) return null;
    const updated = await unit.update(data);
    return updated;
  } catch (error) {
    console.error("Error in updateUnit:", error);
    throw error;
  }
};

const deleteUnitByUid = async (uid) => {
  try {
    const unit = await Unit.findOne({ where: { uid } });
    if (!unit) return null;
    await unit.destroy();
    return true;
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

module.exports = {
  createUnit,
  getAllUnits,
  getUnitByUid,
  getUnitsByAccommodationUid,
  updateUnitByUid,
  deleteUnitByUid,
};
