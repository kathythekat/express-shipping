"use strict";

/** Server for shipit. */

const express = require("express");
const { NotFoundError } = require("./expressError");
const app = new express();
const shipmentsRoutes = require("./routes/shipments");

app.use(express.json());
app.use("/shipments", shipmentsRoutes);


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



module.exports = app;