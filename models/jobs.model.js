module.exports = (sequelize, Sequelize) => {
  const Jobs = sequelize.define("job", {
    qty: {
      type: Sequelize.STRING,
    },
    customer_address: {
      type: Sequelize.STRING,
    },
    customer_company: {
      type: Sequelize.STRING,
    },
    customer_email: {
      type: Sequelize.STRING,
    },
    customer_name: {
      type: Sequelize.STRING,
    },
    customer_tax: {
      type: Sequelize.STRING,
    },
    customer_tel: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.STRING,
    },
    rooms_id: {
      type: Sequelize.INTEGER,
    },
  });

  return Jobs;
};
