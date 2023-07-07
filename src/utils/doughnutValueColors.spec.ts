import "@testing-library/jest-dom";
import doughnutValueColors from "./doughnutValueColors";

describe("Sets different rgb colors depending on chart value'", () => {
  it("returns rgba(250, 82, 82, 1)", () => {
    const input = doughnutValueColors(30);
    expect(input).toBe("rgba(250, 82, 82, 1)");
  });
  it("returns rgba(250, 176, 5, 1)", () => {
    const input = doughnutValueColors(0);
    expect(input).toBe("rgba(250, 82, 82, 1)");
  });
  it("returns rgb(64, 192, 87)", () => {
    const input = doughnutValueColors(100);
    expect(input).toBe("rgba(64, 192, 87, 1)");
  });
});
