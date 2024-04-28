const path = require('path');
const config = require('../config');

var express = require('express');
var router = express.Router();

const mdeIpGrabber = require('../common/lib/ip-grabber');
const logger = require('../common/lib/logger');

const syncs = require('./syncs');
const stations = require('./stations');

router.get('/', mdeIpGrabber, function (req, res, next) {
    logger.log('info', req, '연결 테스트 수행');
    res.json({title: config.basic.name, ver: config.basic.version});
});

router.use('/syncs', syncs);
router.use('/stations', stations);

module.exports = router;
