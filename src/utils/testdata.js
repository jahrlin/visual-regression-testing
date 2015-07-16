import jsonfile from 'jsonfile';

var defaultData = {
  domain: '',
  screenshots: []
};

function configure(testPath) {
  return new Promise((resolve, reject) => {
    let file = testPath + '/data.json';

    jsonfile.writeFile(file, defaultData, (err) => {
      if (err) {
        reject(err);
      }

      resolve(file);
    });
  });
}

function addScreenshotsToTest(testPath, screenshots) {
  return new Promise((resolve, reject) => {
    let file = testPath + '/data.json';
    let data;
    jsonfile.readFile(file, (readError, object) => {
      if (readError) {
        reject(readError);
      }

      data = object;
      data.screenshots = screenshots;

      jsonfile.writeFile(file, data, (err) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
    });
  });
}

export default { configure, addScreenshotsToTest };
