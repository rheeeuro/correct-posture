const polyfill = require("@babel/polyfill");
const request = require("supertest");
const app = require("./src/init");

describe("app js test", function () {
  describe("Global Router", function () {
    it("should respond to GET with empty path", function (done) {
      request(app).get("/").expect(200).end(done);
    });
    it("should respond to GET with join path", function (done) {
      request(app).get("/join").expect(200).end(done);
    });
    it("should respond to GET with login path", function (done) {
      request(app).get("/login").expect(200).end(done);
    });
    it("should respond to GET with judge path", function (done) {
      request(app).get("/judge").expect(200).end(done);
    });
    it("should respond to GET with exerciseList path", function (done) {
      request(app).get("/posture/exerciseList").expect(200).end(done);
    });
  });
});
