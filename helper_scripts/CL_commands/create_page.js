#!/usr/bin/env node

const inquirer = require('inquirer');
const helper = require('./__helpers');

process.stdin.resume();
process.stdin.setEncoding('utf8');

function afterPageCreation(filename, prettyurl = null) {
  process.stdout.write('\n');
  process.stdout.write(`New Page ${filename} is created and ready!`);
  process.stdout.write('\n');
  if (prettyurl) {
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
}

function askQuestions() {
  const questions = [
    {
      name: 'filename',
      type: 'input',
      message: 'Enter page name: (without whitespace)',
      validate(value) {
        if (value.length) {
          if (
            helper.isUsedOnDir(
              helper.config.pagesDir,
              value.indexOf('.js') > 0 ? value : `${value}.js`
            )
          ) {
            return "It's already added. Please enter new page name.";
          }
          return true;
        }
        return 'It cannot be empty. Please enter it correctly...';
      }
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
    helper.createPageFromTemplate(filename, () => {
      afterPageCreation(filename, prettyurl);
    });
  });
}

helper.writeRan(askQuestions);
