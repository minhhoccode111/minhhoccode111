const express = require("express");
const router = express.Router();
const tagsController = require("../controllers/tagsController");

// get all tags exited, no auth
router.get("/", tagsController.getTags);

module.exports = router;
