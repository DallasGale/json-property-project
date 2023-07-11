import "@testing-library/jest-dom";
import DecimalFormatter from "./decimalFormatter";

describe("Formats a number by 2 decimal places if below 10", () => {
  it("returns 0 decimal places", () => {
    const input = DecimalFormatter(34.2);
    expect(input).toBe("34");
  });

  it("returns 2 decimal places", () => {
    const input = DecimalFormatter(9.2);
    expect(input).toBe("9.20");
  });
  it("returns 0 decimal places", () => {
    const input = DecimalFormatter(10.43);
    expect(input).toBe("10");
  });
});
