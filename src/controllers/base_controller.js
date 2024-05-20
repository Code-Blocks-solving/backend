const { Model } = require('mongoose');

class BaseController  {
    constructor(model) {
        this.model = model;
    }

    async get(req, res) {
        console.log("getAllStudents");
        try {
            if (req.query.name) {
                const students = await this.model.find({ name: req.query.name });
                res.send(students);
            } else {
                const students = await this.model.find();
                res.send(students);
            }
        } catch (err) {
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

    putById(req, res) {
        res.send("put student by id: " + req.params.id);
    }

    deleteById(req, res) {
        res.send("delete student by id: " + req.params.id);
    }
}

const createController = (model) => {
    return new BaseController(model);
}

module.exports = createController;