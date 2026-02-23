const customerService = require("../services/customerService");
const {
  successResponse,
  errorResponse,
} = require("../middlewares/responseMiddleware");
const create = async (req, res) => {
  try {
    const { name, surname, phoneNumber, identityNumber } = req.body;
    if (!name || !surname || !phoneNumber || !identityNumber) {
      return errorResponse(res, "Required fields are missing", 400);
    }
    const customer = await customerService.createCustomer(req.body);
    return successResponse(res, customer);
  } catch (error) {
    console.error("Customer creation failed:", error);
    return errorResponse(res, error.message, 500, error);
  }
};

const getAll = async (req, res) => {
  try {
    const customers = await customerService.getAllCustomers();
    return successResponse(res, customers);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const getByUid = async (req, res) => {
  try {
    const uid = req.params.uid;
    if (!uid) return errorResponse(res, "Required fields are missing", 400);
    const customer = await customerService.getCustomerByUid(uid);
    if (!customer) return errorResponse(res, "Customer not found", 404);
    return successResponse(res, customer);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const updateByUid = async (req, res) => {
  try {
    const { name, surname, phoneNumber, identityNumber } = req.body;
    const id = req.params.id;
    if (!name || !surname || !phoneNumber || !identityNumber)
      return errorResponse(res, "Required fields are missing", 400);

    const updated = await customerService.updateCustomerByUid(uid, req.body);
    if (!updated) return errorResponse(res, "Customer not found", 404);
    return successResponse(res, updated);
  } catch (error) {
    return errorResponse(res, error.message, 500, error);
  }
};

const getCustomersByAccommodationUid = async (req, res) => {
  try {
    const { uid } = req.params;

    const customers = await customerService.getCustomersByAccommodationUid(uid);

    return successResponse(res, customers);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to fetch customers");
  }
};

const deleteByUid = async (req, res) => {
  try {
    const uid = req.params.uid;
    if (!uid) return errorResponse(res, "Required fields are missing", 400);
    const deleted = await customerService.deleteCustomerByUid(req.params.uid);
    if (!deleted) return errorResponse(res, "Customer not found", 404);

    return res.status(204).send(); // Başarılı, içerik yok
  } catch (error) {
    return errorResponse(res, "Delete failed", 500, error);
  }
};

module.exports = {
  create,
  getAll,
  getByUid,
  updateByUid,
  getCustomersByAccommodationUid,
  deleteByUid,
};
