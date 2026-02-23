const { User } = require("../models");

// Tek bir rezervasyonu biçimlendir
const responseBookingDetailDTO = (booking) => {
  if (!booking) return null;

  return {
    uid: booking.uid,
    status: booking.status,
    startDate: booking.startDate,
    endDate: booking.endDate,
    customerCount: booking.customerCount,
    description: booking.description || null,
    createdAt: booking.createdAt,

    user: booking.User
      ? {
          uid: booking.User.uid,
          name: booking.User.name,
          email: booking.User.email,
        }
      : null,

    unit: booking.Unit
      ? {
          uid: booking.Unit.uid,
          name: booking.Unit.name,
          type: booking.Unit.type || null,
        }
      : null,
  };
};

const responseBookingOwnerDTO = (booking) => {
  if (!booking) return null;

  return {
    uid: booking.uid,
    status: booking.status,
    startDate: booking.startDate,
    endDate: booking.endDate,
    customerCount: booking.customerCount,

    unit: booking.Unit
      ? {
          uid: booking.Unit.uid,
          name: booking.Unit.name,
        }
      : null,
    user: {
      uid: booking.User?.uid || null,
      name: booking.User?.name || null,
      surname: booking.User?.surname || null,
      email: booking.User?.email || null,
    },
  };
};

// Birden fazla rezervasyonu biçimlendir (liste halinde)
const responseBookingListDTO = (bookings) => {
  if (!Array.isArray(bookings)) return [];
  return bookings.map(responseBookingDTO);
};

const responseBookingListDetailDTO = (bookings) => {
  if (!Array.isArray(bookings)) return [];
  return bookings.map(responseBookingDetailDTO);
};

module.exports = {
  responseBookingDetailDTO,
  responseBookingListDetailDTO,
  responseBookingOwnerDTO,
  responseBookingListDTO,
};
