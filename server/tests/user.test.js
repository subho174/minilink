const request = require("supertest");
const app = require("../src/app");

describe("User Auth", () => {
  let agent = request.agent(app); // persist cookies for session
  const testUser = {
    email: "jestuser@example.com",
    password: "12345678",
  };

  it("should sign up a user", async () => {
    const res = await agent.post("/user/sign-up").send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toMatch(/success/i);
  });

  let refreshCookie;

  it("should sign in a user and set cookies", async () => {
    const res = await agent.post("/user/sign-in").send(testUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/success/i);

    const cookies = res.headers["set-cookie"];
    expect(cookies).toBeDefined();

    // Capture refresh token cookie
    refreshCookie = cookies.find((c) => c.startsWith("refreshToken"));
  });

  it("should logout user", async () => {
  const res = await agent
    .post("/user/logout")
    .set("Cookie", refreshCookie);

  expect(res.statusCode).toBe(200);
  expect(res.body.message).toMatch(/logged out/i);
});
});
