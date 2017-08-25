#!/usr/bin/env node

const inquirer = require('inquirer');
const helper = require('./__helpers');

process.stdin.resume();
process.stdin.setEncoding('utf8');

function afterPageCreation(filename, prettyurl = null) {
  helper.getTempfromHandlebar(
    `${helper.config.templatesDir}/route.hbs`,
    {
      filename,
      prettyurl
    },
    code => {
      helper.addTexttoFile(
        helper.config.routeFile,
        '// @RANEndRoutes',
        code,
        () => {
          process.stdout.write('\n');
          process.stdout.write(
            `New Page ${filename} is added to "./routes.js" and ready!`
          );
          process.stdout.write('\n');
          process.stdout.write('\n');
          process.exit(0);
        }
      );
    }
  );
}

function askQuestions() {
  const questions = [
    {
      name: 'filename',
      type: 'list',
      message: 'Which page do you want to use:',
      choices: () => helper.getFilesOnDir(helper.config.pagesDir)
    },
    {
      name: 'isPretty',
      type: 'confirm',
      message: ({ filename }) =>
        `Do you want different URL? (current: /${filename})`,
      default: false
    },
    {
      name: 'prettyurl',
      type: 'input',
      message: 'Enter new URL:',
      when: ({ isPretty }) => isPretty,
      validate(value) {
        if (value.length) {
          if (helper.isUsedOnRoutes(value)) {
            return "It's already added. Please enter new URL.";
          }
          return true;
        }
        return 'It cannot be empty. Please enter it correctly...';
      }
    }
  ];

  inquirer.prompt(questions).then(({ filename, prettyurl = null }) => {
    if (prettyurl) {
      afterPageCreation(filename, prettyurl);
    } else {
      process.stdout.write('\n');
      process.stdout.write(`New route creation is cancelled...`);
      process.stdout.write('\n');
      process.exit(0);
    }
  });
}

helper.writeRan(askQuestions);
