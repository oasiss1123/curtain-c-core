const db = require("../models");
const Test = db.test;
const Op = db.Sequelize.Op;

// Create and Save data
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const test = {
    qty: req.body.qty,
    customer_address: req.body.customer_address,
    customer_company: req.body.customer_company,
    customer_email: req.body.customer_email,
    customer_name: req.body.customer_name,
    customer_tax: req.body.customer_tax,
    customer_tel: req.body.customer_tel,
    date: req.body.date,
    rooms_name: req.body.rooms_name,
    curtain_name: req.body.curtain_name,
    price: req.body.price,
    width: req.body.width,
    height: req.body.height,
    pattern: req.body.pattern,
    curtain_front_size: req.body.curtain_front_size,
    rail_price: req.body.rail_price,
    ocpacity_curtain_price: req.body.ocpacity_curtain_price,
    dark_curtain_price: req.body.dark_curtain_price,
    total: req.body.total,
  };

  Test.create(test)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the record.",
      });
    });
};

// Find all data in table
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { title: { [Op.like]: `%${name}%` } } : null;

  Test.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving record.",
      });
    });
};

// Find a single with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Test.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Records with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Records with id=" + id + "/" + err,
      });
    });
};

// Update by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  // const test = {
  //   qty: req.body.qty,
  //   customer_address: req.body.customer_address,
  //   customer_company: req.body.customer_company,
  //   customer_email: req.body.customer_email,
  //   customer_name: req.body.customer_name,
  //   customer_tax: req.body.customer_tax,
  //   customer_tel: req.body.customer_tel,
  //   date: req.body.date,
  //   rooms_name: req.body.rooms_name,
  //   curtain_name: req.body.curtain_name,
  //   price: req.body.price,
  //   width: req.body.width,
  //   height: req.body.height,
  //   pattern: req.body.pattern,
  //   curtain_front_size: req.body.curtain_front_size,
  //   rail_price: req.body.rail_price,
  //   ocpacity_curtain_price: req.body.ocpacity_curtain_price,
  //   dark_curtain_price: req.body.dark_curtain_price,
  //   total: req.body.total,
  // };

  Test.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        Users.findByPk(id)
          .then((data) => {
            if (data) {
              res.send(data);
            } else {
              res.status(404).send({
                message: `Cannot find Records with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Records with id=" + id + "/" + err,
            });
          });
      } else {
        res.send({
          message: `Cannot update Assets with id=${id}. Maybe Records was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Records with id=" + id,
      });
      console.log(err);
    });
};

// Delete with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Test.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Records was Delete successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Records with id=${id}. Maybe Records was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error delete Records with id=" + id + "/" + err,
      });
    });
};
