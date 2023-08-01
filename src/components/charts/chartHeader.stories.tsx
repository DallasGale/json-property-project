import type { Meta, StoryObj } from "@storybook/react";

import ChartHeader from "./chartHeader";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Charts/ChartHeader",
  component: ChartHeader,
  parameters: {},
} satisfies Meta<typeof ChartHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    title: "Chart Title",
    description: "Chart Description",
    value: "54k",
  },
};
