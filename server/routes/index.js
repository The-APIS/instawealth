const path = require('path')
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('*', function(req, res, next) {
  return res.sendFile(path.resolve(__dirname, '../build/index.html'))
});

module.exports = router;
