const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

it("Shound something", async () => {
  const resp = await request.get("/")
  expect(resp.status).toEqual(200)
});