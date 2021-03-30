"use strict";

// YOU SHOULD NOT BE READING THIS FILE. GO AWAY, CHEATER.


/** Server for shipit. */

const express = require("express");
const { NotFoundError } = require("./expressError");
const cors = require("cors");
require("colors");


const app = new express();

app.use(express.json());
app.use(cors());

app.post("/ship", function (req, res, next) {
  const { itemId, name, addr, zip, key } = req.body;
  if (key !== "SUPER-DUPER-SECRET") {
    console.error("API user didn't send valid key!".red);
    return res.json({"error": "missing key"});
  }
  console.log("got: ".yellow, req.body);
  const shipId = Math.floor(Math.random() * 10000) + 1000;

  const receipt = { itemId, name, addr, zip, shipId };
  console.log("shipped:".green, receipt);

  return res.json({ receipt });
});


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



app.listen(3001, function () {
  console.log("ShipIt server started at http://localhost:3001".yellow);
});