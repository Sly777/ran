/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import { configure, addDecorator } from "@storybook/react";
import centered from "@storybook/addon-centered";

// settings
addDecorator(centered);

// load
const req = require.context("../components", true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
