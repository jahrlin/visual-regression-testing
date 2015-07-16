/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import { Router } from 'express';
import TestConstants from '../constants/TestConstants';
import fs from 'fs';
import * as fshelper from '../utils/filesystem';
import * as selenium from '../utils/selenium';
import * as testdata from '../utils/testdata';

const router = new Router();

router.get('/list', async (req, res, next) => {
  try {
    let path = TestConstants.TEST_ROOT;

    var prom = new Promise((resolve, reject) => {
      fs.readdir(path, function(err, list) {
        if (err) {
          reject(err);
        }
        resolve(list);
      });
    });

    prom.then(function(data) {
      res.json(data);
    });
  } catch (err) {
    next(err);
  }
});

router.get('/list/:name', async (req, res, next) => {
  try {
    let folderName = req.params.name;
    let path = TestConstants.TEST_ROOT + folderName;

    var prom = new Promise((resolve, reject) => {
      fs.readdir(path, (err, list) => {
        if (err) {
          reject(err);
        }
        resolve(list);
      });
    });

    prom.then((data) => {
      res.json(data);
    }).catch((error) => {
      if (error.code === 'ENOENT') {
        res.status(500).send('No tests exists for ' + folderName);
      }

      res.json(error);
    });

  } catch (err) {
    next(err);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    let test = req.body;
    let urls = test.urls.split(/\r?\n/);

    //get the domain
    var matches = urls[0].match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    var domain = matches && matches[1];  // domain will be null if no match is found

    if (domain === null) {
      console.error('first url doesnt have a domain');
    } else {
      console.log('domain', domain);
    }

    //data is full path to test instance directory
    fshelper.createTest(domain).then((fullTestPath) => {
      console.log('created test at', fullTestPath);
      let dataFile;
      testdata.configure(fullTestPath).then((result) => {
        dataFile = result;
      }).catch((ex) => {
        console.error(ex);
      });

      //we have everything set up, lets take some screenshots
      selenium.run(urls, fullTestPath).then((values) => {
        console.log('ran', values);
        //values is a map of url: screenshot name
        testdata.addScreenshotsToTest(fullTestPath, values).then((data) => {
          console.log('added screenshots', data);
          res.status(200).json(values);
        }).catch((err) => {
          res.status(500).json(err);
        });
      });
    });
  } catch (err) {
    next(err);
  }
});

export default router;

