const { Booking, User, Unit, Customer, Accommodation } = require("../models");

const createBooking = async ({
  startDate,
  endDate,
  customerCount,
  description,
  UserId,
  UnitId,
  customers,
}) => {
  const status = null;
  const result = await Booking.sequelize.transaction(async (t) => {
    // 1. Booking oluştur
    const booking = await Booking.create(
      {
        status,
        startDate,
        endDate,
        customerCount,
        description,
        UserId,
        UnitId,
      },
      { transaction: t }
    );

    // 2. Her bir müşteri için Customer kaydı oluştur ve BookingId ile bağla
    for (const customer of customers) {
      await Customer.create(
        {
          name: customer.name,
          surname: customer.surname,
          phoneNumber: customer.phoneNumber,
          identityNumber: customer.identityNumber,
          BookingId: booking.id,
        },
        { transaction: t }
      );
    }

    return booking;
  });

  return result;
};

const getAllBookings = async () => {
  const bookings = await Booking.findAll({
    where: { isDeleted: false },
    include: [User, Unit, Customer],
  });
  return bookings;
};

const getBookingByUid = async (uid) => {
  const booking = await Booking.findOne({
    where: { uid, isDeleted: false },
    include: [User, Unit, Customer],
  });
  return booking;
};

const getBookingsByUserUid = async (userUid) => {
  try {
    const bookings = await Booking.findAll({
      where: { isDeleted: false },
      include: [
        {
          model: User,
          where: { uid: userUid },
          attributes: [],
        },
        {
          model: Unit,
          include: [Accommodation],
        },
      ],
    });

    return bookings;
  } catch (error) {
    console.error("Error in Get user bookings:", error);
    throw error;
  }
};

const getBookingsByUserAccommodation = async (userUid) => {
  try {
    const user = await User.findOne({ where: { uid: userUid } });
    if (!user) throw new Error("User not found");

    const accommodation = await Accommodation.findOne({
      where: { UserId: user.id, isDeleted: false },
    });
    if (!accommodation)
      throw new Error("Accommodation not found for this user");

    const bookings = await Booking.findAll({
      where: { isDeleted: false },
      include: [
        {
          model: Unit,
          where: { AccommodationId: accommodation.id },
          attributes: ["uid", "name"],
        },
        {
          model: User,
          attributes: ["uid", "name", "surname", "email"],
        },
      ],
    });

    return bookings;
  } catch (error) {
    console.error("Error in Get user Accommodation Booking:", error);
    throw error;
  }
};

const updateBookingByUid = async (uid, data) => {
  try {
    const booking = await Booking.findOne({ where: { uid } });
    if (!booking) return null;

    const updated = await booking.update(data);
    return updated;
  } catch (error) {
    console.error("Error in updateBooking:", error);
    throw error;
  }
};

const deleteBookingByUid = async (uid) => {
  try {
    const booking = await Booking.findOne({ where: { uid } });
    if (!booking) return null;
    await booking.destroy();
    return true;
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingByUid,
  getBookingsByUserUid,
  getBookingsByUserAccommodation,
  updateBookingByUid,
  deleteBookingByUid,
};
