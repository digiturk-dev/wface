const childProcess = require('child_process');
const fs = require('fs-extra');
const gulp = require('gulp');
var minimist = require('minimist');

var knownOptions = { string: 'version' };
var options = minimist(process.argv.slice(2), knownOptions);

gulp.task('publish', function () {
  const command = "npm publish --access=public"

  childProcess.execSync(command, { stdio: [0, 1, 2], cwd: './packages/cefsharp-container/' });
  childProcess.execSync(command, { stdio: [0, 1, 2], cwd: './packages/cli/' });
  childProcess.execSync(command, { stdio: [0, 1, 2], cwd: './packages/components/' });
  childProcess.execSync(command, { stdio: [0, 1, 2], cwd: './packages/container/' });
  childProcess.execSync(command, { stdio: [0, 1, 2], cwd: './packages/ioc/' });
  childProcess.execSync(command, { stdio: [0, 1, 2], cwd: './packages/store/' });
});

gulp.task('version', function () {
  const newVersion = options.version;
  if (!newVersion) {
    console.error('Please specify version parameter!');
    return;
  }
  updateVersion('./packages/cefsharp-container/package.json', newVersion);
  updateVersion('./packages/cli/package.json', newVersion);
  updateVersion('./packages/components/package.json', newVersion);
  updateVersion('./packages/container/package.json', newVersion);
  updateVersion('./packages/ioc/package.json', newVersion);
  updateVersion('./packages/store/package.json', newVersion);
});

gulp.task('versions', function () {
  const print = (project) => {
    console.log(project + ": " + require('./packages/' + project + '/package.json').version);
  }

  print('cli');
  print('cefsharp-container');
  print('components');
  print('container');
  print('ioc');
  print('store');
});

const updateVersion = (path, version) => {
  const package = require(path);
  console.log(package.name + " old version is " + package.version);

  package.version = version;
  if (package.dependencies["@wface/cefsharp-container"]) package.dependencies["@wface/cefsharp-container"] = version;
  if (package.dependencies["@wface/components"]) package.dependencies["@wface/components"] = version;
  if (package.dependencies["@wface/container"]) package.dependencies["@wface/container"] = version;
  if (package.dependencies["@wface/ioc"]) package.dependencies["@wface/ioc"] = version;
  if (package.dependencies["@wface/store"]) package.dependencies["@wface/store"] = version;

  const data = JSON.stringify(package, null, "\t");
  fs.writeFileSync(path, data);
}