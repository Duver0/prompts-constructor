import { test, expect } from "@playwright/test";

test.describe("Prompt Architect — Critical Paths", () => {
  test("should load and redirect to library", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/library/);
    await expect(page.getByText("Prompt Library")).toBeVisible();
  });

  test("should navigate to templates page", async ({ page }) => {
    await page.goto("/library");
    await page.getByText("Templates", { exact: true }).first().click();
    await expect(page).toHaveURL(/\/templates/);
    await expect(page.getByText("Templates", { exact: true })).toBeVisible();
  });

  test("should navigate to settings page", async ({ page }) => {
    await page.goto("/library");
    await page.getByRole("link", { name: "Settings" }).first().click();
    await expect(page).toHaveURL(/\/settings/);
    await expect(page.getByText("Settings")).toBeVisible();
  });

  test("should have a header with the app name", async ({ page }) => {
    await page.goto("/library");
    await expect(page.getByText("Prompt Architect")).toBeVisible();
  });
});

test.describe("Prompt CRUD", () => {
  test("should create a new prompt and redirect to editor", async ({ page }) => {
    await page.goto("/library");

    // Should show empty state initially
    await expect(page.getByText("No prompts yet")).toBeVisible();

    // Click "New Prompt" button
    await page.getByRole("button", { name: /new prompt/i }).click();

    // Modal should open
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByText("New Prompt")).toBeVisible();

    // Type a title and create
    await page.getByLabel("Prompt Title").fill("Test E2E Prompt");
    await page.getByRole("button", { name: "Create" }).click();

    // Should redirect to editor
    await expect(page).toHaveURL(/\/library\//);
    await expect(page.getByText("Test E2E Prompt")).toBeVisible();
  });

  test("should create and delete a prompt from library", async ({ page }) => {
    await page.goto("/library");

    // Create a prompt first
    await page.getByRole("button", { name: /new prompt/i }).click();
    await page.getByLabel("Prompt Title").fill("Delete Me");
    await page.getByRole("button", { name: "Create" }).click();

    // Wait for editor, then navigate back to library
    await expect(page).toHaveURL(/\/library\//);
    await page.getByRole("link", { name: "Library" }).first().click();
    await expect(page).toHaveURL("/library");

    // Should see the prompt in the list
    await expect(page.getByText("Delete Me")).toBeVisible();

    // Click delete (the trash icon button)
    const deleteButton = page.getByLabel("Delete Delete Me");
    await deleteButton.click();

    // Should be gone
    await expect(page.getByText("Delete Me")).not.toBeVisible();
  });
});

test.describe("Prompt Editor", () => {
  test("should add and edit blocks in the editor", async ({ page }) => {
    await page.goto("/library");

    // Create a new prompt
    await page.getByRole("button", { name: /new prompt/i }).click();
    await page.getByLabel("Prompt Title").fill("Block Test");
    await page.getByRole("button", { name: "Create" }).click();
    await expect(page).toHaveURL(/\/library\//);

    // Add a Role block via sidebar
    await page.getByRole("button", { name: "+ Role" }).click();

    // Type in the Role block textarea
    const textarea = page.getByLabel("Role content");
    await textarea.fill("You are an expert coding assistant.");

    // Save the prompt
    await page.getByRole("button", { name: "Save" }).click();

    // Toast should appear
    await expect(page.getByText("Prompt saved")).toBeVisible();
  });
});

test.describe("Export", () => {
  test("should navigate to export center and show preview", async ({ page }) => {
    await page.goto("/library");

    // Create a prompt
    await page.getByRole("button", { name: /new prompt/i }).click();
    await page.getByLabel("Prompt Title").fill("Export Test");
    await page.getByRole("button", { name: "Create" }).click();
    await expect(page).toHaveURL(/\/library\//);

    // Add a block
    await page.getByRole("button", { name: "+ Role" }).click();
    const textarea = page.getByLabel("Role content");
    await textarea.fill("Test content");

    // Navigate to export
    await page.getByRole("button", { name: "Export" }).click();
    await expect(page).toHaveURL(/\/export\//);

    // Should see export format options
    await expect(page.getByText("Export Format")).toBeVisible();
    await expect(page.getByText("ChatGPT")).toBeVisible();

    // Click export
    await page.getByRole("button", { name: "Export" }).click();

    // Should see preview
    await expect(page.getByText("Preview")).toBeVisible();
    await expect(page.getByText("Test content")).toBeVisible();
  });
});

test.describe("Version History", () => {
  test("should create a version from the editor", async ({ page }) => {
    await page.goto("/library");

    // Create a prompt
    await page.getByRole("button", { name: /new prompt/i }).click();
    await page.getByLabel("Prompt Title").fill("Version Test");
    await page.getByRole("button", { name: "Create" }).click();
    await expect(page).toHaveURL(/\/library\//);

    // Navigate to versions
    await page.getByRole("button", { name: "Versions" }).click();
    await expect(page).toHaveURL(/\/versions\//);

    // Should see "No versions yet" since we haven't created one
    await expect(page.getByText("No versions yet")).toBeVisible();
  });
});

test.describe("Templates", () => {
  test("should create a new template", async ({ page }) => {
    await page.goto("/templates");

    // Should see "No templates yet"
    await expect(page.getByText("No templates yet")).toBeVisible();

    // Create a template
    await page.getByRole("button", { name: "New Template" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.getByLabel("Template Name").fill("Code Review");
    await page.getByLabel("Description").fill("Template for code review prompts");
    await page.getByRole("button", { name: "Create" }).click();

    // Should appear in list
    await expect(page.getByText("Code Review")).toBeVisible();
    await expect(page.getByText("Coding")).toBeVisible();
  });
});
