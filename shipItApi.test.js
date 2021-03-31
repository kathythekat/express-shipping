"use strict";
const AxiosMockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const axiosMock = new AxiosMockAdapter(axios);

const {
  shipProduct, SHIPIT_SHIP_URL,
} = require("./shipItApi");


afterAll(function () {
  // after we've finished with these tests, restore axios to acting normally
  axiosMock.reset();
});

test("shipProduct", async function () {
  // mock out every call to the API URL:
  axiosMock.onPost(SHIPIT_SHIP_URL).reply(200, {
    receipt: {
      itemId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
      shipId: 10,
    },
  });


const shipId = await shipProduct({
  productId: 1000,
  name: "Test Tester",
  addr: "100 Test St",
  zip: "12345-6789",
});

  expect(shipId).toEqual(10);
});
