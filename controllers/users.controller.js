const db = require("../models");
const Users = db.users;
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

  const user = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    position: req.body.position,
    user_name: req.body.user_name,
  };

  Users.create(user)
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

  Users.findAll({ where: condition })
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

  Users.findByPk(id)
    .then((data) => {
      if (data) {
        const newData = {
          id: data.id,
          name: data.name,
          password: data.password,
          email: data.email,
          position: data.position,
          user_name: data.user_name,
        };

        res.send(newData);
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

  Users.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        Users.findByPk(id)
          .then((data) => {
            if (data) {
              const newData = {
                id: data.id,
                name: data.name,
                password: data.password,
                email: data.email,
                position: data.position,
                user_name: data.user_name,
              };

              res.send(newData);
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
    });
};

// Delete with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Users.destroy({
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
