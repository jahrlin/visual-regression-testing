/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import { Router } from 'express';
import TestConstants from '../constants/TestConstants';
import fs from 'fs';
import * as fshelper from '../utils/filesystem';

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

    fshelper.createTest(domain).then((data) => {
      res.status(200).json(data);
    });
  } catch (err) {
    next(err);
  }
});

export default router;

