const express = require('express');
const router = express.Router();
const codeBlockController = require('../controllers/code_block_controller');

router.get("/", codeBlockController.get.bind(codeBlockController));

router.get("/:id", codeBlockController.getById.bind(codeBlockController));


module.exports = router;
