module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("testing", {
    name: {
      type: Sequelize.STRING,
    },
  });

  return Users;
};
