'use strict';

var express = require('express');
var controller = require('./auth.controller'),
    sessionSec = require('../../components/tools/sessionSec');

var router = express.Router();

router.post('/login', controller.signIn);
router.post('/changePassword', controller.changePassword);

router.use(sessionSec);

// router.get('/', controller.index);
// router.get('/:id', controller.show);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;