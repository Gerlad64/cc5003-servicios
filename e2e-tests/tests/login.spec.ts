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

    await page.getByLabel("Nombre de usuario").fill("esteban.lopez");
    await page.getByLabel("Contraseña").fill("password");
    await page.getByRole("button", { name : "Iniciar Sesión" }).last().click();
    await expect(page.getByText("esteban.lopez")).toBeVisible();
  });
});