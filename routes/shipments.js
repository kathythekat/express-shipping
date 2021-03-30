"use strict";

const { NotFoundError } = require("../expressError");

const jsonschema = require("jsonschema");
const shipItSchema = require("../shipItSchema.json");
const express = require("express");
const router = new express.Router();

const { shipProduct } = require("../shipItApi");

/** POST /ship
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  try {
    const result = jsonschema.validate(req.body, shipItSchema);
    const { productId, name, addr, zip } = req.body;
    const shipId = await shipProduct({ productId, name, addr, zip });
    console.log("SHIP ID 2:", shipId)
    if (!result.valid) {
      let errs = result.errors.map(err => err.stack);
      throw new NotFoundError(errs);
    }
    return res.json({ shipped: shipId });
  
  } catch (err) {
    return next(err);
  }
  // const { productId, name, addr, zip } = req.body;
  // const shipId = await shipProduct({ productId, name, addr, zip });
  // return res.json({ shipped: shipId });
});


module.exports = router;