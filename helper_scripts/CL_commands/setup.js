#!/usr/bin/env node

/* eslint-disable import/no-unresolved */

const shell = require('shelljs');
const clear = require('cli-clear');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const helper = require('./__helpers');

const isCleanSetup = process.env.CLEANSETUP || false;
const projectName = path.basename(path.resolve(helper.config.appDir)) || 'RAN';

clear();
process.stdin.resume();
process.stdin.setEncoding('utf8');

function cleanSetup(callback) {
  if (!isCleanSetup) return callback();

  const comps = shell
    .find(helper.config.componentsDir)
    .filter(
      (file, index) =>
        index !== 0 &&
        !file.toLowerCase().includes('appicons') &&
        !file.toLowerCase().includes('authfields') &&
        !file.toLowerCase().includes('app.js') &&
        !file.toLowerCase().includes('theme.js')
    );
  shell.rm('-rf', comps);

  const pages = shell
    .find(helper.config.pagesDir)
    .filter(
      (file, index) =>
        index !== 0 && !file.toLowerCase().includes('_document.js')
    );
  shell.rm('-rf', pages);

  helper.createPageFromTemplate('index', () => {});
  helper.createContainerFromTemplate('Default', () => {});
  helper.clearRoutes(() => {
    callback();
  });
}

function updateReadme(callback) {
  shell.rm('-rf', shell.find(`${helper.config.appDir}README.md`));
  helper.updateReadme(projectName, () => {
    callback();
  });
}

/**
 * Initializes git again
 */
function initGit(callback) {
  exec('git init && git add . && git commit -m "Initial commit"', callback);
}

/**
 * Deletes a file in the current directory
 */
function deleteFileInCurrentDir(file, callback) {
  fs.unlink(path.join(__dirname, file), callback);
}

/**
 * Callback function after installing dependencies
 */
function installDepsCallback(error) {
  process.stdout.write('\n\n');
  if (error) {
    process.stderr.write(error);
    process.stdout.write('\n');
    process.exit(1);
  }

  deleteFileInCurrentDir('setup.js', () => {
    process.stdout.write('Initialising new repository...');
    initGit(() => {
      cleanSetup(() => {
        updateReadme(() => {
          clear();
          process.stdout.write('\n');
          process.stdout.write('\nRAN! is ready to go!');
          process.stdout.write('\n');
          process.stdout.write('\n');
          process.exit(0);
        });
      });
    });
  });
}

/**
 * Installs dependencies
 */
function installDeps() {
  exec('node --version', (err, stdout) => {
    const nodeVersion = stdout && parseFloat(stdout.substring(1));
    if (nodeVersion < 7 || err) {
      installDepsCallback(
        err ||
          'Unsupported node.js version, make sure you have the latest version installed.'
      );
    } else {
      installDepsCallback();
    }
  });
}

/**
 * Deletes the .git folder in dir
 */
function cleanRepo(callback) {
  shell.rm('-rf', '.git/');
  callback();
}

helper.writeRan(() => {
  process.stdout.write('\n');
  process.stdout.write('Cleaning RAN! for preparing new project...');
  process.stdout.write('\n');

  cleanRepo(() => {
    process.stdout.write(
      'Installing dependencies... (This might take a while)'
    );
    installDeps();
  });
});
