import webdriver from 'selenium-webdriver';
import fs from 'fs';

var remoteUrl = process.env.SELENIUM_URL;

function takeScreenshot(url, name, basepath, driver) {
  return new Promise((resolve, reject) => {
    driver.get(url).then(function() {
      driver.takeScreenshot().then(function(data) {
        var base64Data = data.replace(/^data:image\/png;base64,/, '');
        let fileName = name + '.png';
        fs.writeFile(basepath + '/' + fileName, base64Data, 'base64', function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({url: url, name: fileName});
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
      usingServer(remoteUrl).
      withCapabilities(webdriver.Capabilities.phantomjs()).
      build();

    let promises = [];

    urls.forEach((u, i) => {
      promises.push(takeScreenshot(u, i + 1, basepath, driver));
    });

    Promise.all(promises).then((values) => {
      resolve(values);
    }).catch((err) => {
      reject(err);
    });

    driver.quit();
  });

  return prom;
}

export default {run};
