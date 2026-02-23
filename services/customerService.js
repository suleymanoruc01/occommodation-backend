const { Accommodation, Unit, Customer, Booking } = require("../models");

const createCustomer = async (data) => {
  const created = await Customer.create(data);
  return created;
};

const getAllCustomers = async () => {
  const customers = await Customer.findAll({ include: [Booking] });
  return customers;
};

const getCustomerByUid = async (uid) => {
  const customer = await Customer.findOne({
    where: { uid },
    include: [Booking],
  });
  return customer;
};

const updateCustomerByUid = async (uid, data) => {
  try {
    const customer = await Customer.findOne({ where: { uid } });
    if (!customer) return null;

    const updated = await customer.update(data);
    return updated;
  } catch (error) {
    console.error("Error in updateCustomer:", error);
    throw error;
  }
};

const getCustomersByAccommodationUid = async (accommodationUid) => {
  const accommodation = await Accommodation.findOne({
    where: { uid: accommodationUid },
    include: {
      model: Unit,
      include: {
        model: Booking,
        include: {
          model: Customer,
        },
      },
    },
  });

  if (!accommodation) {
    throw new Error("Accommodation not found");
  }

  const customers = [];

  accommodation.Units.forEach((unit) => {
    unit.Bookings.forEach((booking) => {
      booking.Customers.forEach((customer) => {
        customers.push(customer);
      });
    });
  });

  return customers;
};

const deleteCustomerByUid = async (uid) => {
  try {
    const customer = await Customer.findOne({ where: { uid } });
    if (!customer) return null;
    await customer.destroy();
    return true;
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerByUid,
  updateCustomerByUid,
  getCustomersByAccommodationUid,
  deleteCustomerByUid,
};
