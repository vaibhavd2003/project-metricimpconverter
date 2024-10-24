'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    let input = req.query.input || '1'; // Default to '1' if no input is provided
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    if (initNum === "invalid number" && initUnit === "invalid unit") {
      res.json({ error: "invalid number and unit" });
    } else if (initNum === "invalid number") {
      res.json({ error: "invalid number" });
    } else if (initUnit === "invalid unit") {
      res.json({ error: "invalid unit" });
    } else {
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let toString = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );

      res.json({
        initNum,
        initUnit: initUnit.toLowerCase(),
        returnNum,
        returnUnit: returnUnit.toLowerCase(),
        string: toString,
      });
    }
  });
};

