const db = require("../models");
const Jobs = db.jobs;
const Rooms = db.rooms;

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

  const job = {
    qty: req.body.qty,
    customer_address: req.body.customer_address,
    customer_company: req.body.customer_company,
    customer_email: req.body.customer_email,
    customer_name: req.body.customer_name,
    customer_tax: req.body.customer_tax,
    customer_tel: req.body.customer_tel,
    date: req.body.date,
    // rooms_id: 1,
    // rooms: req.body.rooms,
  };

  // console.log(job);

  Jobs.create(job)
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

// function () {
//   var objArr = [];
//   models.address.findById(6).then(function(address){
//     objArr.push(address);
//   });
//   console.log(objArr);
//   return objArr
// }

// function createRooms(params) {
//   var v = [];

//   params.map((room) => {
//     Rooms.create(room)
//       .then((data) => {
//         console.log(data.dataValues);

//         v.push(data.dataValues);
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the record.",
//         });
//       });
//   });

//   return v;
//   // console.log(v.join());

//   // let res = v.join();
// }

// Find all data in table
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { title: { [Op.like]: `%${name}%` } } : null;

  Jobs.findAll({ where: condition })
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

  Jobs.findByPk(id)
    .then((data) => {
      if (data) {
        const newData = {
          id: data.id,
          qty: data.qty,
          customer_address: data.customer_address,
          customer_company: data.customer_company,
          customer_email: data.customer_email,
          customer_name: data.customer_name,
          customer_tax: data.customer_tax,
          customer_tel: data.customer_tel,
          date: data.date,
          rooms: JSON.parse(data.rooms),
        };

        // const response = {
        //   id: newData.id,
        //   qty: newData.qty,
        //   customer_address: newData.customer_address,
        //   customer_company: newData.customer_company,
        //   customer_email: newData.customer_email,
        //   customer_name: newData.customer_name,
        //   customer_tax: newData.customer_tax,
        //   customer_tel: newData.customer_tel,
        //   date: newData.date,
        //   rooms: JSON.parse(newData.rooms),
        //   vat: "test vat",
        // };

        res.send("pass");
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

  Jobs.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        Jobs.findByPk(id)
          .then((data) => {
            if (data) {
              const newData = {
                id: data.id,
                qty: data.qty,
                customer_address: data.customer_address,
                customer_company: data.customer_company,
                customer_email: data.customer_email,
                customer_name: data.customer_name,
                customer_tax: data.customer_tax,
                customer_tel: data.customer_tel,
                date: data.date,
                rooms: JSON.parse(data.rooms),
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
        message: "Error updating Records with id=" + id + "/" + err,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Jobs.destroy({
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
