const CodeBlockModel = require('../models/code_block_model');
const BaseController = require('./base_controller');

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

    async post(req, res) {
        console.log("postStudent:" + req.body);
        try {
            const obj = await this.model.create(req.body);
            res.status(201).send(obj);
        } catch (err) {
            console.log(err);
            res.status(406).send("fail: " + err.message);
        }
    }

 
    async putById(req, res) {
        console.log("putById:" + req.body);
        try {
            await this.model.findByIdAndUpdate(req.params.id, req.body);
            const obj = await this.model.findById(req.params.id);
            res.status(200).send(obj);
        } catch (err) {
            console.log(err);
            res.status(406).send("fail: " + err.message);
        }
    }

    async deleteById(req, res) {
        console.log("deleteById:" + req.body);
        try {
            await this.model.findByIdAndDelete(req.params.id);
            res.status(200).send("OK");
        } catch (err) {
            console.log(err);
            res.status(406).send("fail: " + err.message);
        }
    }

    editCodeBlock(req, res) {
        console.log("editCodeBlock");
        const socket = io('http://localhost:3000');

        const id = req.params.id;
        const newCodeBlock = {
          content: req.body,
        }; 
        socket.emit('editCodeBlock', { id, newCodeBlock });
    }

    async post(req, res) {
        console.log("postStudent:" + req.body);
        const _id = req.user._id;
        req.body.owner = _id;
        super.post(req, res);
    }
}

module.exports = new CodeBlockController();