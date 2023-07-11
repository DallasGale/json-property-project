import TimeframeAsString from "./timeframeAsString";
import "@testing-library/jest-dom";

describe("Renders a human readable timeframe string based on timeframe number'", () => {
  it(`returns "All Time"`, () => {
    const input = TimeframeAsString(0);
    expect(input).toBe("All Time");
  });

  it(`returns "Last 7 Days"`, () => {
    const input = TimeframeAsString(7);
    expect(input).toBe("Last 7 Days");
  });

  it(`returns "Last 24 Hours"`, () => {
    const input = TimeframeAsString(1);
    expect(input).toBe("Last 24 Hours");
  });
  it(`returns "Last 30 Days"`, () => {
    const input = TimeframeAsString(30);
    expect(input).toBe("Last 30 Days");
  });
  it(`returns "Last 90 Days"`, () => {
    const input = TimeframeAsString(90);
    expect(input).toBe("Last 90 Days");
  });
});
