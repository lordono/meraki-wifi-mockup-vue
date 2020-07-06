const express = require("express");
const controller = require("./controller");

const router = express.Router();

// routes
router.get(/\/(.*)/, controller.http_get);
router.post(/\/(.*)/, controller.http_post);
router.put(/\/(.*)/, controller.http_put);
router.patch(/\/(.*)/, controller.http_patch);
router.delete(/\/(.*)/, controller.http_delete);

module.exports = router;
