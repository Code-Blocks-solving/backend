const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student_controller');

router.get("/", studentController.get.bind(studentController));

router.get("/:id", studentController.getById.bind(studentController));

router.post("/", studentController.post.bind(studentController));

router.put("/:id",  studentController.putById.bind(studentController));

router.delete("/:id", studentController.deleteById.bind(studentController));

module.exports = router;