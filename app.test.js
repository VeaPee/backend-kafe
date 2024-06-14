const app = require("./server");
const supertest = require("supertest");
const request = supertest(app);

jest.useFakeTimers();

describe("/", () => {
  it("should return a response", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});

describe("/api/users/getuser", () => {
  it("should return a response", async () => {
    const response = await request.get("/api/users/getuser");
    expect(response.status).toBe(401);
  });
});

describe("/api/products", () => {
  it("should return a response", async () => {
    const response = await request.get("/api/products");
    expect(response.status).toBe(401);
  });
});

describe("/api/users/logout", () => {
  it("should return a response", async () => {
    const response = await request.get("/api/users/logout");
    expect(response.status).toBe(200);
  });
});

describe("/api/users/loggedin", () => {
  it("should return a response", async () => {
    const response = await request.get("/api/users/loggedin");
    expect(response.status).toBe(200);
  });
});