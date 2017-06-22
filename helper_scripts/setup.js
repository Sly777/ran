#!/usr/bin/env node

const shell = require('shelljs');
const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdout.write('\n');
process.stdout.write('Cleaning RAN! for preparing new project...');
process.stdout.write('\n');

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
      process.stdout.write('\nDone! RAN! is ready to go!');
      process.exit(0);
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
      exec('yarn --version', (_err, _stdout) => {
        if (
          parseFloat(_stdout) < 0.15 ||
          _err ||
          process.env.USE_YARN === 'false'
        ) {
          exec('npm install', installDepsCallback());
        } else {
          exec('yarn install', installDepsCallback());
        }
      });
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

cleanRepo(() => {
  process.stdout.write('Installing dependencies... (This might take a while)');
  installDeps();
});
