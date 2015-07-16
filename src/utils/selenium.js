import webdriver from 'selenium-webdriver';
import fs from 'fs';

function takeScreenshot(url, name, basepath, driver) {
  return new Promise((resolve, reject) => {
    driver.get(url).then(function() {
      driver.takeScreenshot().then(function(data) {
        var base64Data = data.replace(/^data:image\/png;base64,/, '');
        fs.writeFile(basepath + '/' + name + '.png', base64Data, 'base64', function(err) {
          if (err) {
            reject(err);
          } else {
            resolve(url);
          }
        });
      });
    });
  });
}

function run(urls, basepath) {
  var prom = new Promise((resolve, reject) => {
    var driver = new webdriver.Builder().
      forBrowser('phantomjs').
      usingServer('redacted').
      withCapabilities(webdriver.Capabilities.phantomjs()).
      build();

    let promises = [];

    urls.forEach((u, i) => {
      promises.push(takeScreenshot(u, i + 1, basepath, driver));
    });

    Promise.all(promises).then(() => {
      resolve('all resolved');
    }).catch((err) => {
      reject(err);
    });

    driver.quit();
  });

  return prom;
}

export default {run};
