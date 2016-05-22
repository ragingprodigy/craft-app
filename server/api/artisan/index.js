'use strict';

var express = require('express');
var controller = require('./artisan.controller'),
    sessionSec = require('../../components/tools/sessionSec');

var router = express.Router();
router.use(sessionSec);

router.get('/', controller.index);
router.get('/all', controller.all);

router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/:id/addWorkPic', controller.newWorkPic);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.delete('/:id/:pictureId', controller.removeWorkPic);

module.exports = router;