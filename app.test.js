const app = require("./server");
const supertest = require("supertest");
const request = supertest(app);

jest.useFakeTimers();

describe("/", () => {
  it("should return a response", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World");
  });
});