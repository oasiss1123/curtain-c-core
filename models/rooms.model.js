module.exports = (sequelize, Sequelize) => {
  const Rooms = sequelize.define("rooms", {
    name: {
      type: Sequelize.STRING,
    },
    height: {
      type: Sequelize.INTEGER,
    },
    width: {
      type: Sequelize.INTEGER,
    },
  });

  return Rooms;
};
