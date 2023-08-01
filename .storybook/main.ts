// import type { StorybookConfig } from "@storybook/nextjs";

const path = require("path");
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });
    (config.resolve.modules = [path.resolve(__dirname, ".."), "node_modules"]),
      (config.resolve.alias = {
        ...config.resolve.alias,
        "@components": path.resolve(__dirname, "../src/components"),
        "@assets": path.resolve(__dirname, "../public"),
        "@fixtures": path.resolve(__dirname, "../_fixtures_"),
        "@utils": path.resolve(__dirname, "../src/utils"),
      });

    return config;
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
