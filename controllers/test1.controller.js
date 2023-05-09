const db = require("../models");
const Test1 = db.test1;
const Op = db.Sequelize.Op;
const puppeteer = require("puppeteer");
const hbs = require("handlebars");
const fs = require("fs-extra");
const path = require("path");
// const data = require("../data.json");

exports.genpdf = async (req, res) => {
  // const browser = await puppeteer.launch({ headless: true });
  // const page = await browser.newPage();
  // await page.goto("https://blog.risingstack.com", {
  //   waitUntil: "networkidle0",
  // });
  // const pdf = await page.pdf({ format: "A4" });

  // await browser.close();
  // return pdf;

  const datas = await Test1.findByPk(32);

  console.log("dataa", datas.dataValues);

  const newData = {
    text1: datas.dataValues.rail_ocpa_price === 0 ? "ผ้าโปร่ง" : "eieiza",
  };

  const compile = async function (templateName, datas) {
    const filePath = path.join(
      process.cwd(),
      "templates",
      `${templateName}.hbs`
    );

    const html = await fs.readFile(filePath, "utf8");

    return hbs.compile(html)(datas);
  };

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = await compile("index", newData);
    await page.setContent(content);

    const pd = await page.pdf({
      path: `D:/pdf-c/${datas.dataValues.qty}.pdf`,
      format: "A4",
      printBackground: true,
    });

    res.send(pd);

    await browser.close();
  } catch (e) {
    console.log(e);
  }
};

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
    amount: req.body.amount,
    total: req.body.total,
    dark_price: req.body.dark_price,
    ocpa_price: req.body.ocpa_price,
    rail_dark_price: req.body.rail_dark_price,
    rail_ocpa_price: req.body.rail_ocpa_price,
  };

  Test1.create(test)
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

  Test1.findAll({ where: condition })
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

  Test1.findByPk(id)
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

  Test1.update(req.body, {
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
    });
};

// Delete with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Test1.destroy({
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
