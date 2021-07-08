const express = require('express');
const router = express.Router();
const debug = require('debug')('instawealth:server:routes:webhooks')

router.get('/rapyd', function(req, res, next) {

  debug(req.query)
  debug(req.params)

  // TODO
  // 1. On SUCCESS, show in frontend "payment succeeded"
  // 2. Send n USDC to someone

  return res.status(200).send('Thank you!');
});

module.exports = router;
