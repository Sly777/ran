import { configure, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered";
import { withKnobs } from "@storybook/addon-knobs";

import "~/__utils__/setup";

// settings
addDecorator(centered);
addDecorator(withKnobs);

// load
const req = require.context("../", true, /stories\.jsx?$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
