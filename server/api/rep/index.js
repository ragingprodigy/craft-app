'use strict';

var express = require('express');
var controller = require('./rep.controller'),
  sessionSec = require('../../components/tools/sessionSec');

var router = express.Router();
router.use(sessionSec);

router.post('/createAccount', controller.createAccount);
router.post('/activate', controller.activate);
router.post('/deactivate', controller.deactivate);

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;