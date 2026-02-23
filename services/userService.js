const {
  Comment,
  Booking,
  User,
  Unit,
  Accommodation,
  UserRole,
} = require("../models");

const createUser = async (userData) => {
  const created = await User.create(userData);
  return created;
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const getUserByUid = async (uid) => {
  const user = await User.findOne({ where: { uid } });
  return user;
};

const updateUserRole = async (uid, role) => {
  const validRoles = ["admin", "owner", "user"];
  if (!validRoles.includes(role)) {
    throw new Error("Geçersiz rol");
  }

  const user = await User.findOne({ where: { uid } });
  if (!user) {
    throw new Error("Kullanıcı bulunamadı");
  }

  const userRole = await UserRole.findOne({ where: { UserId: user.id } });
  if (!userRole) {
    throw new Error("Kullanıcının rol kaydı bulunamadı");
  }

  userRole.role = role;
  await userRole.save();

  return {
    uid: user.uid,
    newRole: userRole.role,
  };
};

const updateUserByUid = async (uid, updateData) => {
  try {
    const user = await User.findOne({ where: { uid } });
    if (!user) return null;

    const updated = await user.update(updateData);
    return updated;
  } catch (error) {
    console.error("Error in updateAccommodation:", error);
    throw error;
  }
};

const deleteUserByUid = async (uid) => {
  try {
    const user = await User.findOne({ where: { uid } });
    if (!user) return null;
    await user.destroy();
    return true;
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

const findByEmail = async (email) => {
  return (user = User.findOne({ where: { email } }));
};

module.exports = {
  createUser,
  getAllUsers,
  getUserByUid,
  updateUserRole,
  updateUserByUid,
  deleteUserByUid,
  findByEmail,
};
