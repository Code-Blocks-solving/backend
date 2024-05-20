const express = require('express');
const router = express.Router();
const codeBlockController = require('../controllers/code_block_controller');

router.get("/", codeBlockController.get.bind(codeBlockController));

router.get("/:id", codeBlockController.getById.bind(codeBlockController));

router.post("/",  codeBlockController.post.bind(codeBlockController));

router.put("/:id", codeBlockController.putById.bind(codeBlockController));

router.delete("/:id", codeBlockController.deleteById.bind(codeBlockController));

module.exports = router;
