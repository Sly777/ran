const figlet = require('figlet');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
const replace = require('replace-in-file');
const router = require('../../routes');

const modules = {};

modules.config = {
  appDir: './',
  pagesDir: './pages',
  componentsDir: './components',
  templatesDir: './helper_scripts/templates',
  routeFile: './routes.js',
  serverFile: './server.js'
};

modules.writeRan = function writeRan(callback) {
  chalk.yellow(
    figlet.text(
      'RAN!',
      {
        verticalLayout: 'full'
      },
      (err, data) => {
        process.stdout.write('\n');
        process.stdout.write(data);
        process.stdout.write('\n');
        if (callback) callback();
      }
    )
  );
};

modules.isUsedOnDir = function isUsedOnDir(startPath, filter) {
  if (!fs.existsSync(startPath)) {
    return false;
  }

  const files = fs.readdirSync(startPath);
  let isFound = false;

  for (let i = 0; i < files.length; i += 1) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      isUsedOnDir(filename, filter); // recurse
    } else if (filename.indexOf(filter) >= 0) {
      isFound = true;
    }
  }

  return isFound;
};

modules.getFilesOnDir = function getFilesOnDir(startPath) {
  if (!fs.existsSync(startPath)) {
    return [];
  }

  const files = fs.readdirSync(startPath);
  const isFound = [];

  for (let i = 0; i < files.length; i += 1) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      isFound.concat(getFilesOnDir(filename)); // recurse
    } else {
      const pagename = files[i].replace('.js', '');
      if (pagename !== '_document') isFound.push(pagename);
    }
  }

  return isFound;
};

modules.isUsedOnRoutes = function isUsedOnRoutes(url) {
  let isFound = false;
  router.routes.forEach(route => {
    if (route.pattern.indexOf(url) !== -1) {
      isFound = true;
    }
  });
  return isFound;
};

modules.getTempfromHandlebar = function getTempfromHandlebar(
  tempPath,
  data,
  callback
) {
  fs.readFile(tempPath, 'utf-8', (err, source) => {
    if (err) throw err;
    const template = handlebars.compile(source);
    const exportCode = template(data);

    callback(exportCode);
  });
};

modules.addTexttoFile = function addTexttoFile(
  filePath,
  from,
  text,
  cb,
  before = true
) {
  const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
  const re = new RegExp(from.replace(matchOperatorsRe, '\\$&'));

  replace(
    {
      encoding: 'utf8',
      files: filePath,
      from: re,
      to: before ? `${text}${from}` : `${from}\n${text}`
    },
    error => {
      if (error) {
        return console.error('Error occurred:', error);
      }
      cb();
    }
  );
};

module.exports = modules;
