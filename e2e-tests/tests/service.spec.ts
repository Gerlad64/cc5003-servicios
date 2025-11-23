import { test, expect } from "@playwright/test";

test.describe("Service tests", () => {
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

  test("Create a new service", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("Nombre de usuario").fill("esteban.lopez");
    await page.getByLabel("Contraseña").fill("password");
    await page.getByRole("button", { name : "Iniciar Sesión" }).last().click();

    await page.getByRole("button", { name : "Crear Servicio" }).first().click();

    await page.getByLabel("Nombre del servicio").fill("service123");
    await page.getByLabel("Categoría").fill("Educacion");
    await page.getByLabel("Descripción").fill("Preparacion PAES");
    await page.getByLabel("Ubicación").first().fill("Santiago");
    await page.getByLabel("Horario").fill("Lunes a Sabado 18:00-21:00");
    await page.getByLabel("Precios").fill("$15000 por hora");
    await page.getByLabel("¿Ofrece servicio a domicilio?").check();
    await page.getByLabel("Alcance del delivery (separados por comas)").fill("Santiago Centro, Santiago Oriente");
    await page.getByLabel("WhatsApp").fill("+56912345678");
    await page.getByLabel("Instagram").fill("@profesorpaes");

    await page.getByRole("button", { name : "Crear Servicio" }).last().click();

    // await expect(page.getByText("Servicio creado exitosamente")).toBeVisible();
    // await page.getByRole("button", { name : "Ok" }).click();

    await expect(page.getByText("service123")).toBeVisible();
    await expect(page.getByText("Santiago")).toBeVisible();
    await expect(page.getByText("$15000 por hora")).toBeVisible();

  });

  test("Creating a service while logged out fails", async ({ page }) => {
    await page.goto("/services/create");

    await page.getByLabel("Nombre del servicio").fill("service123");
    await page.getByLabel("Categoría").fill("Educacion");
    await page.getByLabel("Descripción").fill("Preparacion PAES");
    await page.getByLabel("Ubicación").first().fill("Santiago");
    await page.getByLabel("Horario").fill("Lunes a Sabado 18:00-21:00");
    await page.getByLabel("Precios").fill("$15000 por hora");
    await page.getByLabel("¿Ofrece servicio a domicilio?").check();
    await page.getByLabel("Alcance del delivery (separados por comas)").fill("Santiago Centro, Santiago Oriente");
    await page.getByLabel("WhatsApp").fill("+56912345678");
    await page.getByLabel("Instagram").fill("@profesorpaes");

    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toContain('Error al crear el servicio');
      await dialog.dismiss(); // Accept the alert
    });
    
    await page.evaluate(() => {
      document.querySelectorAll('input[type="file"]').forEach(el => el.remove());
    });

    await page.getByRole("button", { name : "Crear Servicio" }).last().click();
  });

});