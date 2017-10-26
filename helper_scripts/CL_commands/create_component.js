#!/usr/bin/env node

const inquirer = require('inquirer');
const helper = require('./__helpers');

process.stdin.resume();
process.stdin.setEncoding('utf8');

function afterPageCreation(filename) {
  process.stdout.write('\n');
  process.stdout.write(`New Component ${filename} is created and ready!`);
  process.stdout.write('\n');
  process.stdout.write('\n');
  process.exit(0);
}

function askQuestions() {
  const questions = [
    {
      name: 'filename',
      type: 'input',
      message: 'Enter component name: (without whitespace)',
      validate(value) {
        if (value.length) {
          if (
            helper.isUsedOnDir(
              helper.config.componentsDir,
              value.indexOf('.js') > 0 ? value.replace('.js', '') : value,
              true
            )
          ) {
            return "It's already added. Please enter new component name.";
          }
          return true;
        }
        return 'It cannot be empty. Please enter it correctly...';
      }
    },
    {
      name: 'haveStore',
      type: 'confirm',
      message: () => 'Do you want to use store?',
      default: false
    },
    {
      name: 'haveGraphql',
      type: 'confirm',
      when: ({ haveStore }) => haveStore,
      message: () => 'Do you want to use graphql on this store?',
      default: false
    },
    {
      name: 'graphqlName',
      type: 'input',
      message: 'Enter graphql file name:',
      when: ({ haveGraphql }) => haveGraphql,
      validate(value) {
        if (value.length) {
          return true;
        }
        return 'It cannot be empty. Please enter it correctly...';
      }
    },
    {
      name: 'haveStyle',
      type: 'confirm',
      message: () => 'Do you want to use style?',
      default: false
    }
  ];

  inquirer.prompt(questions).then(answers => {
    // eslint-disable-next-line no-param-reassign
    answers.filename = answers.filename.replace(/\b\w/g, l => l.toUpperCase());
    helper.createComponentFromTemplate(answers, () => {
      if (answers.haveStore) {
        helper.createStoreFromTemplate(answers);

        if (answers.haveGraphql) {
          helper.createGraphqlFromTemplate(answers);
        }
      }

      if (answers.haveStyle) {
        helper.createStyleFromTemplate(answers);
      }

      setTimeout(() => {
        afterPageCreation(answers.filename);
      }, 1250);
    });
  });
}

helper.writeRan(askQuestions);
