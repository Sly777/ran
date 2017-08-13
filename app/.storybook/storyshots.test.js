import initStoryshots from "@storybook/addon-storyshots";

// TODO: make this import global
import "jest-styled-components";
import "~/__mocks__/next-router";

initStoryshots({
  configPath: "app/.storybook",
  storyKindRegex: /^((?!.*?DontTest).)*$/
});
