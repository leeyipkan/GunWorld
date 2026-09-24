import { describe, expect, it } from "vitest";
import { GUNS, getGun } from "../../src/game/catalog";
import { renderGunPortrait } from "../../src/ui/gunPortrait";

describe("gun portraits", () => {
  it("gives every catalog gun a full SVG portrait", () => {
    for (const gun of GUNS) {
      const html = renderGunPortrait(gun);
      expect(gun.art.template).toBeTruthy();
      expect(html).toContain(`data-gun="${gun.id}"`);
      expect(html).toContain("<svg");
      expect(html).toContain(`${gun.nameZh} 全圖`);
      expect(html).not.toContain("is-empty");
    }
  });

  it("shows a silhouette when no gun is equipped", () => {
    const html = renderGunPortrait(undefined);
    expect(html).toContain('data-gun="none"');
    expect(html).toContain("is-empty");
    expect(html).toContain("未有槍 全圖");
    expect(html).toContain("<svg");
  });

  it("uses extras instead of magic colours for revolver and double barrels", () => {
    const revolver = renderGunPortrait(getGun("p_revolver"));
    const python = renderGunPortrait(getGun("p_python"));
    const m1911 = renderGunPortrait(getGun("p_m1911"));
    const double = renderGunPortrait(getGun("sg_double"));
    const pump = renderGunPortrait(getGun("sg_pump"));
    expect(revolver).toContain('circle cx="360"');
    expect(python).toContain('circle cx="360"');
    expect(m1911).not.toContain('circle cx="360"');
    expect(double).toContain('y="128"');
    expect(double).toContain('y="164"');
    expect(pump).not.toContain('y="164"');
  });

  it("draws a recoil flash on the water gun", () => {
    const html = renderGunPortrait(getGun("toy_water"), true);
    expect(html).toContain("recoil");
    expect(html).toContain("muzzle-flash");
  });
});
