import { toLongDate } from "./to-long-date";

describe(":: Utils :: date :: toLongDate", () => {
  it("should format a valid ISO string date correctly", () => {
    const date = "2024-11-22T00:00:00.000Z";
    expect(toLongDate(date)).toBe("22/11/2024");
  });

  it("should format a valid Date object correctly", () => {
    const date = "2024-11-22T00:00:00.000Z";
    expect(toLongDate(date)).toBe("22/11/2024");
  });
});
