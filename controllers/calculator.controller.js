// Create and Save data
exports.calculator = (req, res) => {
  // Validate request
  console.log(req.body);

  // logic calculator
  let amount = Math.ceil((req.body.width * req.body.pattern) / 2.8);
  let area = ((req.body.height + 0.4) * amount) / 0.9;
  let dark_sum = req.body.dark * area;
  let ocpa_sum = req.body.ocpa * area;
  let rail_ocpa_sum = req.body.ocpa ? req.body.rail * req.body.width : 0;
  let rail_dark_sum = req.body.dark ? req.body.rail * req.body.width : 0;
  let sum = dark_sum + ocpa_sum + rail_ocpa_sum + rail_dark_sum;

  const newData = {
    amount: amount,
    rail_ocpa_sum: parseFloat(rail_ocpa_sum.toFixed(2)),
    rail_dark_sum: parseFloat(rail_dark_sum.toFixed(2)),
    ocpa_curtain_price: parseFloat(ocpa_sum.toFixed(2)),
    dark_curtain_price: parseFloat(dark_sum.toFixed(2)),
    total: parseFloat(sum.toFixed(2)),
  };

  res.send(newData);

  // console.log(job);
};
