"use strict";

const SHIPIT_SHIP_URL = "http://localhost:3001/ship";
const SHIPIT_API_KEY = "SUPER-DUPER-SECRET";

const axios = require("axios");


/** Ship a single product through the shipit API.
 *
 * Returns shipId from shipit.
 */

async function shipProduct({ productId, name, addr, zip }) {
  console.warn("Called our real shipProduct function");

  const resp = await axios({
    method: "POST",
    url: SHIPIT_SHIP_URL,
    data: {
      itemId: productId,
      name: name,
      addr: addr,
      zip: zip,
      key: SHIPIT_API_KEY
    },
  });

  return resp.data.receipt.shipId;
}

module.exports = { shipProduct };
