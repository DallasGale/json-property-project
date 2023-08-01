import PercentFormatter from "./percentFormatter";
import "@testing-library/jest-dom";

describe("Formats percentage decimal places'", () => {
  it(`returns 2 decimal places"`, () => {
    const input = PercentFormatter(13);
    expect(input).toBe("13");
  });

  it(`returns 1 decimal places"`, () => {
    const input = PercentFormatter(7);
    expect(input).toBe("7.00");
  });

  it(`returns < 1"`, () => {
    const input = PercentFormatter(0.5);
    expect(input).toBe("< 1");
  });
});
