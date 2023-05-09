module.exports = (sequelize, Sequelize) => {
  const Test1 = sequelize.define("test2", {
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
    amount: {
      type: Sequelize.INTEGER,
    },
    total: {
      type: Sequelize.FLOAT,
    },
    dark_price: {
      type: Sequelize.FLOAT,
    },
    ocpa_price: {
      type: Sequelize.FLOAT,
    },
    rail_dark_price: {
      type: Sequelize.FLOAT,
    },
    rail_ocpa_price: {
      type: Sequelize.FLOAT,
    },
  });

  return Test1;
};
