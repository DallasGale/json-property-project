import "@testing-library/jest-dom";
import goodToBadColors from "./goodToBadColors";

describe("Sets different rgb colors depending on chart value'", () => {
  it("returns rgba(250, 82, 82, 1)", () => {
    const input = goodToBadColors(30);
    expect(input).toBe("rgba(250, 82, 82, 1)");
  });
  it("returns rgba(250, 176, 5, 1)", () => {
    const input = goodToBadColors(0);
    expect(input).toBe("rgba(250, 82, 82, 1)");
  });
  it("returns rgb(64, 192, 87)", () => {
    const input = goodToBadColors(100);
    expect(input).toBe("rgba(64, 192, 87, 1)");
  });
});
