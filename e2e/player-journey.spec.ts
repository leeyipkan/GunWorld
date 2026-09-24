import { expect, test } from "@playwright/test";

test.describe("player journey", () => {
  test("quiz earns coins to buy a gun and ammo, then the range consumes bullets", async ({ page }) => {
    await page.addInitScript(() => localStorage.clear());
    await page.goto("/?e2e=1");

    await expect(page.getByTestId("screen-home")).toBeVisible();
    await expect(page.getByTestId("coins")).toHaveText("金幣 0");
    await expect(page.getByTestId("ammo")).toHaveText("子彈 0");
    await expect(page.getByTestId("range-lock")).toContainText("要先買一把槍");

    await page.getByTestId("btn-range").click();
    await expect(page.getByTestId("range-block")).toContainText("要先買一把槍");
    await expect(page.getByTestId("btn-fire")).toBeDisabled();
    await expect(page.getByTestId("gun-portrait")).toHaveAttribute("data-gun", "none");
    await expect(page.getByTestId("gun-portrait").locator("svg")).toBeVisible();

    await page.getByTestId("btn-range-shop").click();
    await page.getByTestId("buy-gun-toy_water").click();
    await expect(page.getByTestId("toast")).toContainText("金幣唔夠");

    await page.getByRole("button", { name: "返主頁" }).click();
    await page.getByTestId("btn-quiz").click();

    for (let i = 0; i < 5; i += 1) {
      await page.locator('[data-testid="quiz-option"][data-correct="true"]').click();
      await expect(page.getByTestId("quiz-feedback")).toContainText("好叻");
      await page.getByTestId("quiz-next").click();
    }

    await expect(page.getByTestId("quiz-done")).toContainText("答對 5/5");
    await expect(page.getByTestId("coins")).toHaveText("金幣 115");

    await page.getByTestId("btn-to-shop").click();
    await page.getByTestId("buy-gun-toy_water").click();
    await expect(page.getByTestId("toast")).toContainText("金幣唔夠");
    await page.getByRole("button", { name: "返主頁" }).click();
    await page.getByTestId("btn-quiz").click();

    for (let i = 0; i < 5; i += 1) {
      await page.locator('[data-testid="quiz-option"][data-correct="true"]').click();
      await expect(page.getByTestId("quiz-feedback")).toContainText("好叻");
      await page.getByTestId("quiz-next").click();
    }

    await expect(page.getByTestId("coins")).toHaveText("金幣 230");
    await page.getByTestId("btn-to-shop").click();
    await page.getByTestId("buy-gun-toy_water").click();
    await expect(page.getByTestId("toast")).toContainText("買咗水槍");
    await expect(page.getByTestId("coins")).toHaveText("金幣 110");
    await expect(page.getByTestId("gun")).toHaveText("水槍");

    await page.getByRole("button", { name: "返主頁" }).click();
    await page.getByTestId("btn-range").click();
    await expect(page.getByTestId("range-block")).toContainText("要買子彈");
    await expect(page.getByTestId("gun-portrait")).toHaveAttribute("data-gun", "toy_water");
    await expect(page.getByTestId("gun-portrait")).toContainText("水槍 全圖");

    await page.getByTestId("btn-range-shop").click();
    await page.getByTestId("tab-ammo").click();
    await page.getByTestId("buy-ammo-ammo10").click();
    await expect(page.getByTestId("ammo")).toHaveText("子彈 10");
    await expect(page.getByTestId("coins")).toHaveText("金幣 90");

    await page.getByRole("button", { name: "返主頁" }).click();
    await page.getByTestId("btn-range").click();
    await expect(page.getByTestId("range-block")).toHaveCount(0);
    await page.getByTestId("btn-fire").click();
    await expect(page.getByTestId("ammo")).toHaveText("子彈 9");
    await expect(page.getByTestId("toast")).toContainText("打中");
    await expect(page.getByTestId("gun-portrait")).toHaveAttribute("data-gun", "toy_water");
    await expect(page.getByTestId("gun-portrait").locator("svg")).toBeVisible();
  });
});
