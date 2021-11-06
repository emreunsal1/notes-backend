const userWithoutPassword = (user) => {
  const {
    _id, username, createdAt, updatedAt,
  } = user;

  return {
    _id,
    username,
    createdAt,
    updatedAt,
  };
};

module.exports = {
  userWithoutPassword,
};
