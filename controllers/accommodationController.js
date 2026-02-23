const { User, City, Town } = require("../models");
const accommodationService = require("../services/accommodationService");
const {
  successResponse,
  errorResponse,
} = require("../middlewares/responseMiddleware");
const {
  AccommodationDTO,
  AccommodationDetailsDTO,
  AccommodationBookingDTO,
} = require("../dtos/accommodationDTO");

const createAccommodation = async (req, res) => {
  try {
    const { name, phoneNumber, description, userUid, cityName, townName } =
      req.body;

    // Zorunlu alanlar kontrolü
    if (
      !name ||
      !phoneNumber ||
      !description ||
      !userUid ||
      !cityName ||
      !townName
    ) {
      return errorResponse(res, "Required fields are missing", 400);
    }

    // userUid üzerinden kullanıcıyı bul
    const user = await User.findOne({ where: { uid: userUid } });
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    // cityName üzerinden şehir bilgisi bul
    const city = await City.findOne({ where: { name: cityName } });
    if (!city) {
      return errorResponse(res, "City not found", 404);
    }

    // townName üzerinden ilçe bilgisi bul
    const town = await Town.findOne({
      where: { name: townName, CityId: city.id },
    }); // CityId kontrolü dahil
    if (!town) {
      return errorResponse(res, "Town not found", 404);
    }
    /*
    // villageName üzerinden ilçe bilgisi bul
    const village = await Town.findOne({
      where: { name: villageName, TownId: town.id },
    }); // CityId kontrolü dahil
    if (!village) {
      return errorResponse(res, "Town not found", 404);
    }
*/
    // Oluşturulacak veriyi hazırla
    const accommodationData = {
      name,
      phoneNumber,
      description,
      UserId: user.id,
      CityId: city.id,
      TownId: town.id,
    };

    // Servis üzerinden oluştur
    const data = await accommodationService.createAccommodation(
      accommodationData
    );
    return successResponse(res, data);
  } catch (error) {
    console.error("Accommodation creation failed:", error);
    return errorResponse(res, error.message, 500, error);
  }
};

const getAllAccommodations = async (req, res) => {
  try {
    const data = await accommodationService.getAllAccommodations();
    return successResponse(res, data);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const getAccommodationsByCityId = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return errorResponse(res, "Required fields are missing", 400);
  }

  try {
    const accommodations = await accommodationService.getAccommodationsbyCity(
      id
    );

    const accommodationDTO = accommodations.map((a) => new AccommodationDTO(a));
    return successResponse(res, accommodationDTO);
  } catch (error) {
    return errorResponse(
      res,
      "Şehre ait pansiyonlar alınırken hata oluştu",
      500,
      error.message
    );
  }
};
const getAccommodationsByTownName = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return errorResponse(res, "İlçe adı (name) gerekli", 400);
  }

  try {
    const accommodations =
      await accommodationService.getAccommodationsByTownName(name);
    const accommodationDTO = accommodations.map((a) => new AccommodationDTO(a));
    return successResponse(res, accommodationDTO);
  } catch (error) {
    return errorResponse(
      res,
      "İlçe adına göre pansiyonlar alınırken hata oluştu",
      500,
      error.message
    );
  }
};
const getAccommodationByUid = async (req, res) => {
  try {
    const uid = req.params.uid;
    if (!uid) return errorResponse(res, "Required fields are missing", 400);
    const data = await accommodationService.getAccommodationByUid(uid);
    if (!data) return errorResponse(res, "Accommodation not found", 404);
    const accommodationDTO = new AccommodationDetailsDTO(data);
    return successResponse(res, accommodationDTO);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const getAccommodationbyUserUidwithUnits = async (req, res) => {
  const uid = req.user.uid;
  if (!uid) return errorResponse(res, "Required fields are missing", 400);
  try {
    const accommodation = await accommodationService.getAccommodationByUserUid(
      uid
    );
    if (!accommodation)
      return errorResponse(res, "User's accommodation not found", 404);
    const accommodationDTO = new AccommodationDetailsDTO(accommodation);
    return successResponse(res, accommodationDTO);
  } catch (error) {
    return errorResponse(
      res,
      "Kullanıcının pansiyon bilgisi alınırken hata oluştu",
      500,
      error.message
    );
  }
};

const getAvailableAccommodations = async (req, res) => {
  const { startDate, endDate, city, town } = req.body;
  if (!startDate || !endDate || !city || !town) {
    return errorResponse(res, "Required fields are missing", 400);
  }
  try {
    const foundCity = await City.findOne({ where: { name: city } });
    const foundTown = await Town.findOne({ where: { name: town } });

    if (!foundCity || !foundTown) {
      return errorResponse(res, "City or town not found", 404);
    }

    const data = await accommodationService.findAvailableAccommodations(
      startDate,
      endDate,
      foundCity.id,
      foundTown.id
    );

    if (!data || data.length === 0) {
      return errorResponse(res, "Available accommodation not found", 404);
    }

    const accommodationDTO = data.map((a) => new AccommodationDTO(a));
    return successResponse(res, accommodationDTO);
  } catch (error) {
    return errorResponse(
      res,
      "Uygun pansiyonlar alınırken hata oluştu",
      500,
      error.message
    );
  }
};

const updateAccommodationByUid = async (req, res) => {
  try {
    const { name, phoneNumber, description } = req.body;
    const uid = req.params.uid;
    if (!uid || !name || !phoneNumber || !description)
      return errorResponse(res, "Required fields are missing", 400);
    const updated = await accommodationService.updateAccommodationByUid(
      uid,
      req.body
    );
    if (!updated) return errorResponse(res, "Accommodation not found", 404);
    return successResponse(res, updated);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const softDeleteAccommodation = async (req, res) => {
  const { uid } = req.params;

  if (!uid) {
    return errorResponse(res, "Accommodation UID is required", 400);
  }

  try {
    const accommodation = await accommodationService.getAccommodationByUid(uid);

    if (!accommodation || accommodation.isDeleted) {
      return errorResponse(
        res,
        "Accommodation not found or already deleted",
        404
      );
    }

    accommodation.isDeleted = true;
    await accommodation.save();

    return successResponse(res, { message: "Accommodation deleted (soft)" });
  } catch (error) {
    return errorResponse(
      res,
      "Accommodation silinirken bir hata oluştu",
      500,
      error.message
    );
  }
};

const deleteAccommodationByUid = async (req, res) => {
  try {
    const uid = req.params.uid;
    if (!uid) return errorResponse(res, "Required fields are missing", 400);
    const deleted = await accommodationService.deleteAccommodationByUid(uid);

    if (!deleted) return errorResponse(res, "Accommodation not found", 404);

    return res.status(204).send(); // Başarılı, içerik yok
  } catch (error) {
    return errorResponse(res, "Delete failed", 500, error);
  }
};

// deneme

module.exports = {
  createAccommodation,
  getAllAccommodations,
  getAccommodationsByCityId,
  getAccommodationsByTownName,
  getAccommodationByUid,
  getAccommodationbyUserUidwithUnits,
  getAvailableAccommodations,
  updateAccommodationByUid,
  softDeleteAccommodation,
  deleteAccommodationByUid,
};
