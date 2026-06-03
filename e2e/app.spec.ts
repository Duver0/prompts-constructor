import { test, expect } from "@playwright/test";

test.describe("Prompt Architect", () => {
  test("should load the application and redirect to library", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/library/);
    await expect(page.getByText("Prompt Library")).toBeVisible();
  });

  test("should navigate to templates page", async ({ page }) => {
    await page.goto("/library");
    await page.getByText("Templates", { exact: true }).click();
    await expect(page).toHaveURL(/\/templates/);
    await expect(page.getByText("Templates", { exact: true })).toBeVisible();
  });

  test("should navigate to settings page", async ({ page }) => {
    await page.goto("/library");
    await page.getByText("Settings").click();
    await expect(page).toHaveURL(/\/settings/);
    await expect(page.getByText("Settings")).toBeVisible();
  });

  test("should have a header with the app name", async ({ page }) => {
    await page.goto("/library");
    await expect(page.getByText("Prompt Architect")).toBeVisible();
  });
});
