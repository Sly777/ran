import initStoryshots from "@storybook/addon-storyshots";

initStoryshots({
  configPath: "app/.storybook",
  storyKindRegex: /^((?!.*?DontTest).)*$/
});
