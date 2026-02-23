const bookingService = require("../services/bookingService");
const {
  successResponse,
  errorResponse,
} = require("../middlewares/responseMiddleware");
const {
  responseBookingDTO,
  responseBookingOwnerDTO,
} = require("../dtos/bookingDTO");
const { User, Unit } = require("../models");

const create = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      customerCount,
      description,
      unitUid, // UID ile gelen alan
      customers,
    } = req.body;
    const userUid = req.user.uid;

    if (
      !startDate ||
      !endDate ||
      !customerCount ||
      !unitUid ||
      customers.length === 0
    ) {
      return errorResponse(res, "Zorunlu alanlar eksik veya geçersiz", 400);
    }

    const requiredFields = ["name", "surname", "phoneNumber", "identityNumber"];
    const invalidCustomer = customers.find((c) =>
      requiredFields.some((field) => !c[field])
    );

    if (invalidCustomer) {
      return errorResponse(
        res,
        "Her müşteri için tüm bilgiler girilmelidir",
        400
      );
    }

    // 1. Kullanıcıyı UID ile bul
    const user = await User.findOne({ where: { uid: userUid } });
    if (!user) {
      return errorResponse(res, "Kullanıcı bulunamadı", 404);
    }

    // 2. Unit'i UID ile bul
    const unit = await Unit.findOne({ where: { uid: unitUid } });
    if (!unit) {
      return errorResponse(res, "Belirtilen unit bulunamadı", 404);
    }

    // 3. Booking oluştur
    const booking = await bookingService.createBooking({
      startDate,
      endDate,
      customerCount,
      description,
      UserId: user.id,
      UnitId: unit.id, // UID yerine ID gönderiliyor
      customers,
    });

    return successResponse(res, booking, 201);
  } catch (error) {
    console.error("Booking oluşturulurken hata:", error);
    return errorResponse(res, error.message || "Sunucu hatası", 500, error);
  }
};

const getAll = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
    return successResponse(res, bookings);
  } catch (err) {
    return errorResponse(res, error.message, 500, error);
  }
};

const getByUid = async (req, res) => {
  try {
    const uid = req.params.uid;
    if (!uid) return errorResponse(res, "Required fields are missing", 400);
    const booking = await bookingService.getBookingByUid(uid);
    if (!booking) return errorResponse(res, "Booking not found", 404);
    return successResponse(res, booking);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const getBookingsByUserUid = async (req, res) => {
  const uid = req.user.uid;
  if (!uid) return errorResponse(res, "Required fields are missing", 400);

  try {
    const bookings = await bookingService.getBookingsByUserUid(uid);

    if (!bookings || bookings.length === 0) {
      return errorResponse(res, "User bookings not found", 404);
    }

    const dtoList = bookings.map(responseBookingOwnerDTO);
    console.log(typeof dtoList);
    return successResponse(res, dtoList);
  } catch (error) {
    return errorResponse(
      res,
      "Kullanıcının rezervasyonları alınırken hata oluştu",
      500,
      error.message
    );
  }
};

const getUserAccommodationBookings = async (req, res) => {
  const uid = req.user.uid;
  if (!uid) return errorResponse(res, "Required fields are missing", 400);

  try {
    const bookings = await bookingService.getBookingsByUserAccommodation(uid);
    if (!bookings)
      return errorResponse(res, "User's accommodation booking not found", 404);

    const dtoList = bookings.map(responseBookingOwnerDTO);
    console.log(dtoList);
    return successResponse(res, dtoList);
  } catch (error) {
    console.error("❌ Hata:", error); // Konsola detaylı hata yaz

    return errorResponse(
      res,
      "Pansiyona ait rezervasyonlar alınırken hata oluştu",
      500,
      error.message
    );
  }
};

const updateByUid = async (req, res) => {
  try {
    const uid = req.params.uid;

    const updatedBooking = await bookingService.updateBookingByUid(
      uid,
      req.body
    );
    if (!updatedBooking) return errorResponse(res, "Booking not found", 404);
    return successResponse(res, updatedBooking);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const softDeleteBooking = async (req, res) => {
  const { uid } = req.params;

  if (!uid) {
    return errorResponse(res, "Booking UID is required", 400);
  }

  try {
    const booking = await bookingService.getBookingByUid(uid);

    if (!booking || booking.isDeleted) {
      return errorResponse(res, "Booking not found or already deleted", 404);
    }

    booking.isDeleted = true;
    await booking.save();

    return successResponse(res, { message: "Booking deleted (soft)" });
  } catch (error) {
    return errorResponse(
      res,
      "Rezervasyon silinirken bir hata oluştu",
      500,
      error.message
    );
  }
};
const deleteByUid = async (req, res) => {
  try {
    const uid = req.params.uid;
    if (!uid) return errorResponse(res, "Required fields are missing", 400);
    const deleted = await bookingService.deleteBooking(uid);
    if (!deleted) return errorResponse(res, "Accommodation not found", 404);

    return res.status(204).send(); // Başarılı, içerik yok
  } catch (error) {
    return errorResponse(res, "Delete failed", 400, error);
  }
};

module.exports = {
  create,
  getAll,
  getByUid,
  getBookingsByUserUid,
  getUserAccommodationBookings,
  updateByUid,
  softDeleteBooking,
  deleteByUid,
};
