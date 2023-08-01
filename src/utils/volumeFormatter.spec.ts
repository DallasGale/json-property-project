import { VolumeFormatter } from "./volumeFormatter";
import "@testing-library/jest-dom";

describe("Formats and rounds up large values (eg: thousands, millions)", () => {
  it(`returns k value"`, () => {
    const input = VolumeFormatter(234943);
    expect(input).toBe("235K");
  });

  it(`returns m value"`, () => {
    const input = VolumeFormatter(1234564);
    expect(input).toBe("1.2M");
  });
});
