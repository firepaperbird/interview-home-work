const express = require("express");
const router = express.Router();

router.use("/api/post",require("./post"));
router.use("/api/user", require("./user"));

module.exports = router;
