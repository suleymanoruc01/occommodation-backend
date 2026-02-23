const { Town, City, Village } = require("../models");

const createTown = async (data) => {
  const created = await Town.create(data);
  return created;
};

const getAllTowns = async () => {
  const towns = await Town.findAll({ include: [City, Village] });
  return towns;
};

const getTownById = async (id) => {
  const town = await Town.findByPk(id, { include: [City, Village] });
  return town;
};

const getTownsByCityUid = async (cityid) => {
  const city = await City.findOne({
    where: { id: cityid },
  });

  if (!city) {
    throw new Error("City not found");
  }

  const towns = await Town.findAll({
    where: { CityId: city.id },
  });

  return towns;
};

const updateTown = async (id, data) => {
  try {
    const town = await Town.findByPk(id);
    if (!town) return null;
    const updated = await town.update(data);
    return updated;
  } catch (error) {
    console.error("Error in updateTown:", error);
    throw error;
  }
};

const deleteTown = async (id) => {
  try {
    const town = await Town.findByPk(id);
    if (!town) return null;
    await town.destroy();
    return true;
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

module.exports = {
  createTown,
  getAllTowns,
  getTownById,
  getTownsByCityUid,
  updateTown,
  deleteTown,
};
