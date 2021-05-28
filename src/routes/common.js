
const router = require("express").Router();

// Test api
router.get("/ping", (_, res) => {
  return res.status(200).json({success: true, message: 'pong'})
})


module.exports = router;
