module.exports = (sequelize, Sequelize) => {
  const Test = sequelize.define("newJob", {
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
    rooms_name: {
      type: Sequelize.STRING,
    },
    curtain_name: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.FLOAT,
    },
    width: {
      type: Sequelize.FLOAT,
    },
    height: {
      type: Sequelize.FLOAT,
    },
    pattern: {
      type: Sequelize.FLOAT,
    },
    curtain_front_size: {
      type: Sequelize.FLOAT,
    },
    rail_price: {
      type: Sequelize.FLOAT,
    },
    ocpacity_curtain_price: {
      type: Sequelize.FLOAT,
    },
    dark_curtain_price: {
      type: Sequelize.FLOAT,
    },
    total: {
      type: Sequelize.FLOAT,
    },
  });

  return Test;
};
