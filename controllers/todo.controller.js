import TaskModel from "../models/task.model.js";

class TaskController {
    static taskList = async (req, res) => {
        try {
            const tasks = await TaskModel.find()
            res.send({
                task_list: tasks
            });
        } catch (err) {
            res.status(400).send({ error: err })
        }
    }

    static task = async (req, res) => {
        try {
            const task = await TaskModel.findById(req.params.id)
            res.send({ task: task })
        } catch (err) {
            res.status(404).send({ error: err })
        }
    }

    static createTask = async (req, res) => {
        try {
            const { title, details } = req.body
            const task = new TaskModel({
                title: title,
                details: details
            })
            const result = await task.save()
            res.status(201).send(result)
        } catch (err) {
            res.status(400).send({ error: err })
        }
    }

    static updateTask = async (req, res) => {
        try {
            const result = await TaskModel.findByIdAndUpdate(req.params.id, req.body)
            res.status(202).send(result)
        } catch (err) {
            res.status(404).send({ error: err })
        }
    }

    static deleteTask = async (req, res) => {
        try {
            const result = await TaskModel.findByIdAndDelete(req.params.id)
            res.status(204).send(result)
        } catch (err) {
            res.status(404).send({ error: err })
        }
    }

    static changeTaskStatus = async (req, res) => {
        try {
            const statusList = ["pending", "complete", "done"]
            if (!statusList.includes(req.body.status))
                throw (new Error("Invalid status"))

            const result = await TaskModel.findByIdAndUpdate(req.params.id, { status: req.body.status })
            res.status(202).send(result)
        } catch (err) {
            res.status(400).send({ error: err })
        }
    }
}

export default TaskController;