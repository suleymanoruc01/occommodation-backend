const {
  Accommodation,
  Booking,
  City,
  Town,
  Village,
  User,
  Unit,
  Comment,
  Content,
} = require("../models");
const { Op } = require("sequelize");
const createAccommodation = async (accommodationData) => {
  const created = await Accommodation.create(accommodationData);
  return created;
};

const getAllAccommodations = async () => {
  const accommodations = await Accommodation.findAll({
    where: { isDeleted: false },
  });
  return accommodations;
};

const getAccommodationsbyCity = async (accommodationCity) => {
  const accommodations = await Accommodation.findAll({
    where: { isDeleted: false },
    include: [
      {
        model: City,
        where: { id: accommodationCity },
      },
      Town,
      Village,
      Unit,
    ],
  });
  return accommodations;
};

const getAccommodationsByTownName = async (townName) => {
  return await Accommodation.findAll({
    where: { isDeleted: false },
    include: [
      {
        model: Town,
        as: "Town",
        where: { name: townName },
        attributes: [],
      },
    ],
  });
};

const getAccommodationByUid = async (accommodationUid) => {
  const accommodation = await Accommodation.findOne({
    where: {
      uid: accommodationUid,
      isDeleted: false,
    },
    include: [
      City,
      Town,
      Village,
      User,
      Unit,
      {
        model: Comment,
        include: [User],
      },
      Content,
    ],
  });
  return accommodation;
};

const getAccommodationByUserUid = async (userUid) => {
  try {
    const accommodation = await Accommodation.findOne({
      where: { isDeleted: false },
      include: [
        {
          model: User,
          where: { uid: userUid },
          attributes: [],
        },
        {
          model: Unit,
        },
        {
          model: City,
          attributes: ["id", "name"],
        },
        {
          model: Town,
          attributes: ["id", "name"],
        },
        {
          model: Village,
          attributes: ["id", "name"],
        },
      ],
    });

    return accommodation;
  } catch (error) {
    console.error("Error in Get user Accommodation:", error);
    throw error;
  }
};

const findAvailableAccommodations = async (
  startDate,
  endDate,
  cityId,
  townId
) => {
  try {
    const accommodations = await Accommodation.findAll({
      where: {
        CityId: cityId,
        TownId: townId,
        isDeleted: false,
      },
      include: [
        {
          model: Unit,
          required: true,
          include: [
            {
              model: Booking,
              required: false,
              where: {
                [Op.not]: {
                  [Op.or]: [
                    { endDate: { [Op.lte]: startDate } },
                    { startDate: { [Op.gte]: endDate } },
                  ],
                },
              },
            },
          ],
        },
        {
          model: City,
          attributes: ["id", "name"],
        },
        {
          model: Town,
          attributes: ["id", "name"],
        },
        {
          model: Village,
          attributes: ["id", "name"],
        },
        {
          model: Content,
        },
      ],
    });

    if (!accommodations) return null;

    return accommodations.filter((acc) =>
      acc.Units.some((unit) => unit.Bookings.length === 0)
    );
  } catch (error) {
    console.error("Error in findAvailableAccommodations:", error);
    throw error;
  }
};

const updateAccommodationByUid = async (uid, updateData) => {
  try {
    const accommodation = await Accommodation.findOne({ where: { uid } });
    if (!accommodation) return null;

    const updated = await accommodation.update(updateData);
    return updated;
  } catch (error) {
    console.error("Error in updateAccommodation:", error);
    throw error;
  }
};

const deleteAccommodationByUid = async (uid) => {
  try {
    const accommodation = await Accommodation.findOne({ where: { uid } });
    if (!accommodation) return null;
    await accommodation.destroy();
    return true;
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

module.exports = {
  createAccommodation,
  getAllAccommodations,
  getAccommodationsbyCity,
  getAccommodationsByTownName,
  getAccommodationByUid,
  getAccommodationByUserUid,
  findAvailableAccommodations,
  updateAccommodationByUid,
  deleteAccommodationByUid,
};
