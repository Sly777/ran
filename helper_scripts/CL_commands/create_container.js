#!/usr/bin/env node

const inquirer = require('inquirer');
const helper = require('./__helpers');

process.stdin.resume();
process.stdin.setEncoding('utf8');

function afterContainerCreation(filename) {
  process.stdout.write('\n');
  process.stdout.write(`New Container ${filename} is created and ready!`);
  process.stdout.write('\n');
  process.stdout.write('\n');
  process.exit(0);
}

function askQuestions() {
  const questions = [
    {
      name: 'filename',
      type: 'input',
      message: 'Enter container name: (without whitespace)',
      validate(value) {
        if (value.length) {
          if (
            helper.isUsedOnDir(
              helper.config.containersDir,
              value.indexOf('.js') > 0 ? value : `${value}.js`
            )
          ) {
            return "It's already added. Please enter new container name.";
          }
          return true;
        }
        return 'It cannot be empty. Please enter it correctly...';
      }
    }
  ];

  inquirer.prompt(questions).then(({ filename }) => {
    helper.createContainerFromTemplate(filename, () => {
      afterContainerCreation(filename);
    });
  });
}

helper.writeRan(askQuestions);
