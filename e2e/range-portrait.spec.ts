import { expect, test } from "@playwright/test";
import { STORAGE_KEY } from "../src/game/catalog";

const seeded = {
  coins: 200,
  ammo: 2,
  ownedGunIds: ["toy_water", "toy_bubble"],
  equippedGunId: "toy_water",
  xp: 50,
  level: 2,
  quizCorrectTotal: 5,
  balloonsPopped: 0,
  shotsFired: 0,
};

test.describe("range and shop integration", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(
      ([key, save]) => {
        localStorage.setItem(key, save);
      },
      [STORAGE_KEY, JSON.stringify(seeded)] as const,
    );
    await page.goto("/?e2e=1");
  });

  test("shows the equipped gun full portrait, tap-shot spends ammo, then locks when empty", async ({ page }) => {
    await page.getByTestId("btn-range").click();
    await expect(page.getByTestId("gun-portrait")).toHaveAttribute("data-gun", "toy_water");
    await expect(page.getByTestId("gun-portrait").locator("svg")).toBeVisible();
    await expect(page.getByTestId("ammo")).toHaveText("子彈 2");

    await page.getByTestId("balloon").first().click();
    await expect(page.getByTestId("ammo")).toHaveText("子彈 1");
    await expect(page.getByTestId("toast")).toContainText("打中");

    await page.getByTestId("btn-fire").click();
    await expect(page.getByTestId("ammo")).toHaveText("子彈 0");
    await expect(page.getByTestId("range-block")).toContainText("要買子彈");
    await expect(page.getByTestId("btn-fire")).toBeDisabled();
    await expect(page.getByTestId("gun-portrait")).toHaveAttribute("data-gun", "toy_water");
  });

  test("equip another owned gun and the range portrait switches", async ({ page }) => {
    await page.getByTestId("btn-shop").click();
    await page.getByTestId("equip-gun-toy_bubble").click();
    await expect(page.getByTestId("toast")).toContainText("換好槍");
    await expect(page.getByTestId("gun")).toHaveText("泡泡槍");

    await page.getByRole("button", { name: "返主頁" }).click();
    await page.getByTestId("btn-range").click();
    await expect(page.getByTestId("gun-portrait")).toHaveAttribute("data-gun", "toy_bubble");
    await expect(page.getByTestId("gun-portrait")).toContainText("泡泡槍 全圖");
  });
});
