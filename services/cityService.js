const { City, Town } = require("../models");

const createCity = async (data) => {
  const created = await City.create(data);
  return created;
};

const getAllCities = async () => {
  const cities = await City.findAll({ include: [Town] });
  return cities;
};

const getCityById = async (id) => {
  const city = await City.findByPk(id, { include: [Town] });
  return city;
};

const updateCity = async (id, data) => {
  try {
    const city = await City.findByPk(id);
    if (!city) return null;

    const updated = await city.update(data);
    return updated;
  } catch (error) {
    console.error("Error in updateCity:", error);
    throw error;
  }
};

const deleteCity = async (id) => {
  try {
    const city = await City.findByPk(id);
    if (!city) return null;
    await city.destroy();
    return true;
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

module.exports = {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
};
