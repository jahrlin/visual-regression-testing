import fs from 'fs';
import TestConstants from '../constants/TestConstants';

//just return a bunch of promises for fs stuff
function getTestInstanceName() {
  let d = new Date();

  let month = d.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  var timestamp = Math.floor(d / 1000);
  let niceDate = d.getFullYear() + '-' + month + '-' + d.getDate() + '_' + timestamp;

  return niceDate;
}

function directoryExists(path) {
  var prom = new Promise((resolve, reject) => {
    fs.lstat(path, (err, stat) => {
      if (err) {
        if (err.code !== 'ENOENT') {
          reject(err);
        }
      }

      if (!stat) {
        resolve(false);
        return;
      }

      resolve(stat.isDirectory());
    });
  });

  return prom;
}

function createDirectoryIfNotExists(path) {
  var prom = new Promise((resolve, reject) => {
    directoryExists(path).then((exists) => {
      if (exists) {
        resolve(path);
        return;
      }

      fs.mkdir(path, (err) => {
        if (err) {
          reject(err);
        }

        resolve(path);
      });
    })
    .catch((ex) => {
      console.error('createDirectoryIfNotExists failed: ', ex);
    });
  });

  return prom;
}

function createTestFolder(name) {
  var prom = new Promise((resolve, reject) => {
    createDirectoryIfNotExists(name).then((path) => {
      resolve(path);
    }).catch((ex) => {
      console.error('createDirectoryIfNotExists promise failed: ', ex);
      reject(ex);
    });
  });

  return prom;
}

function createTest(name) {
  let fullPath = TestConstants.TEST_ROOT + name;
  var prom = new Promise((resolve, reject) => {
    createTestFolder(fullPath).then((path) => {
      console.log('path', path);

      //we have the project folder, lets create a test instance
      createDirectoryIfNotExists(path + '/' + getTestInstanceName()).then((instancePath) => {
        resolve(instancePath);
      })
      .catch((ex) => {
        reject(ex);
      });
    })
    .catch((ex) => {
      console.error('createTestFolder failed: ', ex);
    });
  });

  return prom;
}

export default { createTest };
