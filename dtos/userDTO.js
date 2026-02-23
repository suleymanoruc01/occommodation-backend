const userDto = (user) => {
  if (!user) return null;

  return {
    name: user.name,
    surname: user.surname,
    email: user.email,
  };
};

module.exports = { userDto };
