const router = require("express").Router();

const wallet = require('./wallet')

router.get('/ping', (_, res) => res.status(200).json({success: true, message: 'pong'}))
router.use('/wallet', wallet)


module.exports = router