import calculateVolumeTotal from "./calculateVolumeTotal";
import "@testing-library/jest-dom";

describe("Calculates volume amount/s from an array'", () => {
  it("calculates volume of 1 day", () => {
    const input = calculateVolumeTotal(1, [10]);
    expect(input).toBe(10);
  });
  it("calculates volume of 7 days", () => {
    const input = calculateVolumeTotal(7, [10, 10, 10, 10, 5, 5, 5]);
    expect(input).toBe(55);
  });

  it("calculates volume of 30 days", () => {
    const input = calculateVolumeTotal(
      30,
      [
        10, 10, 10, 10, 5, 5, 5, 10, 10, 10, 10, 5, 5, 5, 10, 10, 10, 10, 5, 5,
        5, 10, 10, 10, 10, 5, 5, 5, 10, 10,
      ]
    );
    expect(input).toBe(240);
  });
});
