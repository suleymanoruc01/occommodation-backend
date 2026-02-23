const { Village, Town, Accommodation } = require("../models");

const createVillage = async (data) => {
  const created = await Village.create(data);
  return created;
};

const getAllVillages = async () => {
  const villages = await Village.findAll({ include: [Town, Accommodation] });
  return villages;
};

const getVillageById = async (id) => {
  const village = await Village.findByPk(id, {
    include: [Town, Accommodation],
  });
  return village;
};

const getVillagesByTownId = async (townUid) => {
  const town = await Town.findOne({
    where: { uid: townUid },
  });

  if (!town) {
    throw new Error("Town not found");
  }

  const villages = await Village.findAll({
    where: { TownId: town.id },
  });

  return villages;
};

const updateVillage = async (id, data) => {
  try {
    const village = await Village.findByPk(id);
    if (!village) return null;
    const updated = await village.update(data);
    return updated;
  } catch (error) {
    console.error("Error in updateVillage:", error);
    throw error;
  }
};

const deleteVillage = async (id) => {
  try {
    const village = await Village.findByPk(id);
    if (!village) return null;
    await village.destroy();
    return true;
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

module.exports = {
  createVillage,
  getAllVillages,
  getVillageById,
  getVillagesByTownId,
  updateVillage,
  deleteVillage,
};
