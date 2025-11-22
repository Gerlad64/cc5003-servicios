import { test, expect } from "@playwright/test";

test.describe("Login tests", () => {
  test.beforeEach(async ({page, request}) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        username: "esteban.lopez",
        password: "password",
        name: "Esteban",
        last_name: "Lopez"
      }
    });

    await page.goto("/");
  });
})