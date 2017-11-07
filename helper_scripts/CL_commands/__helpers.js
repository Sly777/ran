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
  containersDir: './containers',
  librariesDir: './libraries',
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

modules.isUsedOnDir = function isUsedOnDir(
  startPath,
  filter,
  onlyDirectories = false
) {
  if (!fs.existsSync(startPath)) {
    return false;
  }

  if (onlyDirectories) {
    return fs.existsSync(`${startPath}/${filter}`);
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
        throw error;
      }
      cb();
    }
  );
};

modules.createPageFromTemplate = function createPageFromTemplate(
  filename,
  callback
) {
  modules.getTempfromHandlebar(
    `${modules.config.templatesDir}/page.hbs`,
    {
      filename
    },
    code => {
      fs.writeFile(
        `${modules.config.pagesDir}/${filename}.js`,
        code,
        { flag: 'wx' },
        _err => {
          if (_err) throw _err;

          callback();
        }
      );
    }
  );
};

modules.createContainerFromTemplate = function createContainerFromTemplate(
  filename,
  callback
) {
  modules.getTempfromHandlebar(
    `${modules.config.templatesDir}/container.hbs`,
    {
      filename
    },
    code => {
      fs.writeFile(
        `${modules.config.containersDir}/${filename}.js`,
        code,
        { flag: 'w' },
        _err => {
          if (_err) throw _err;

          callback();
        }
      );
    }
  );
};

modules.createComponentFromTemplate = function createComponentFromTemplate(
  options,
  callback = () => {}
) {
  modules.getTempfromHandlebar(
    `${modules.config.templatesDir}/component.hbs`,
    options,
    code => {
      if (
        !fs.existsSync(`${modules.config.componentsDir}/${options.filename}`)
      ) {
        fs.mkdirSync(`${modules.config.componentsDir}/${options.filename}`);
      }

      fs.writeFile(
        `${modules.config.componentsDir}/${options.filename}/index.js`,
        code,
        { flag: 'wx' },
        _err => {
          if (_err) throw _err;

          callback();
        }
      );
    }
  );
};

modules.createStoreFromTemplate = function createStoreFromTemplate(
  options,
  callback = () => {}
) {
  modules.getTempfromHandlebar(
    `${modules.config.templatesDir}/component_store.hbs`,
    options,
    code => {
      fs.writeFile(
        `${modules.config.componentsDir}/${options.filename}/store.js`,
        code,
        { flag: 'wx' },
        _err => {
          if (_err) throw _err;

          callback();
        }
      );
    }
  );
};

modules.createStyleFromTemplate = function createStyleFromTemplate(
  options,
  callback = () => {}
) {
  modules.getTempfromHandlebar(
    `${modules.config.templatesDir}/component_style.hbs`,
    options,
    code => {
      fs.writeFile(
        `${modules.config.componentsDir}/${options.filename}/styles.js`,
        code,
        { flag: 'wx' },
        _err => {
          if (_err) throw _err;

          callback();
        }
      );
    }
  );
};

modules.createGraphqlFromTemplate = function createGraphqlFromTemplate(
  options,
  callback = () => {}
) {
  modules.getTempfromHandlebar(
    `${modules.config.templatesDir}/component_graphql.hbs`,
    options,
    code => {
      fs.writeFile(
        `${modules.config.componentsDir}/${options.filename}/${
          options.graphqlName
        }.gql`,
        code,
        { flag: 'wx' },
        _err => {
          if (_err) throw _err;

          callback();
        }
      );
    }
  );
};

modules.clearReducerList = function clearReducerList(callback) {
  modules.getTempfromHandlebar(
    `${modules.config.templatesDir}/reducer.hbs`,
    {},
    code => {
      fs.writeFile(
        `${modules.config.librariesDir}/reducer.js`,
        code,
        { flag: 'w' },
        _err => {
          if (_err) throw _err;

          callback();
        }
      );
    }
  );
};

modules.clearRoutes = function clearRoutes(callback) {
  const re = /^(routes.)[A-Za-z(', /:);_]*/gm;

  replace(
    {
      encoding: 'utf8',
      files: `${modules.config.routeFile}`,
      from: re,
      to: ''
    },
    error => {
      if (error) {
        throw error;
      }
      callback();
    }
  );
};

modules.updateReadme = function updateReadme(projectname, callback) {
  modules.getTempfromHandlebar(
    `${modules.config.templatesDir}/readme.hbs`,
    {
      projectname
    },
    code => {
      fs.writeFile(
        `${modules.config.appDir}README.md`,
        code,
        { flag: 'wx' },
        _err => {
          if (_err) throw _err;

          callback();
        }
      );
    }
  );
};

module.exports = modules;
