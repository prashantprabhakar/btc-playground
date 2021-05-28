const router = require("express").Router();

const common = require('./common')

router.use('/common', common)


module.exports = router