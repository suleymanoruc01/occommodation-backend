const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: "Bu işlemi yapmak için yetkiniz yok.",
      });
    }

    next();
  };
};

module.exports = {
  authorizeRoles,
};
