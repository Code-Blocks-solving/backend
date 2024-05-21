const CodeBlockModel = require('../models/code_block_model');

class CodeBlockController {
    constructor() {
        this.model = CodeBlockModel;
    }
    async get(req, res) {
        console.log("getAllCodes");
        try {
            if (req.query.name) {
                const students = await this.model.find({ name: req.query.name });
                console.log(students);
                res.send(students);
            } else {
                const students = await this.model.find();
                res.send(students);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }

    async getById(req, res) {
        console.log("getStudentById:" + req.params.id);
        try {
            const student = await this.model.findById(req.params.id);
            res.send(student);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }


}

module.exports = new CodeBlockController();