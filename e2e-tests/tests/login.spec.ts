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

  test("Successful login", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("username").fill("esteban.lopez");
    await page.getByLabel("password").fill("password");
    await page.getByRole("button").click();
    await expect(page.getByText("Esteban")).toBeVisible();
  });
});