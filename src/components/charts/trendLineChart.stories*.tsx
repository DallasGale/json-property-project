import type { Meta, StoryObj } from "@storybook/react";

import TrendLineChart from "./trendLineChart";
import { trendLineLabels } from "@fixtures/trendLineLabels";
import { loanVolumeMovingAverage } from "@fixtures/loanVolumeMovingAverage";
import { fakeVolumeMovingAverage } from "@fixtures/fakeVolumeMovingAverage";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Charts/TrendLineChart",
  component: TrendLineChart,
  parameters: {},
} satisfies Meta<typeof TrendLineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    labels: trendLineLabels,
    legendLabels: [
      {
        color: "accent-yellow",
        name: "Loan Volume Trend",
        id: "loan-volume-trend",
      },
      {
        color: "accent-red",
        name: "Fake Volume Trend",
        id: "fake-volume-trend",
      },
    ],
    datasets: [
      {
        label: "Loan Volume Trend",
        data: loanVolumeMovingAverage.slice(
          loanVolumeMovingAverage.length - 90
        ),
        borderColor: "rgba(250, 176, 5, 1)",
        backgroundColor: "rgba(250, 176, 5, 1)",
        pointRadius: 0,
        borderWidth: 3,
      },
      {
        label: "Fake Volume Trend",
        data: fakeVolumeMovingAverage.slice(
          fakeVolumeMovingAverage.length - 90
        ),
        borderColor: "rgba(250, 82, 82, 1)",
        backgroundColor: "rgba(250, 82, 82, 1)",
        pointRadius: 0,
        borderWidth: 3,
      },
    ],
    legendOnClick: () => {},
    legendFormat: "horizontal",
  },
};
